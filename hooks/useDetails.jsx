import { useRef, useState } from "react";
import {
  createRecipe,
  deleteRecipeRequest,
  getRecipeRequest,
} from "../api/recipe";
import { Alert, Animated } from "react-native";
import { createDeleteFavorite } from "../api/favorite";
import { deleteImage, getImageData } from "../utils/image";
import { useRouter, useNavigation } from "expo-router";
import useRecipeStore from "../store/recipeStore";
import Toast from "react-native-toast-message";
import useAuthStore from "../store/authStore";
import useFavoriteStore from "../store/favoriteStore";

export default function useDetails({ id }) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const backgroundColor = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ["transparent", "white"],
    extrapolate: "clamp",
  });
  const bottomSheetRef = useRef(null);

  const limitSteps = 3;

  const { allRecipes, updateLocalRecipe, deleteRecipe } = useRecipeStore();
  const { handleFavorite: handleFavoriteStore, recipesFavorited } =
    useFavoriteStore();
  const { token, user } = useAuthStore();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);
  const [sending, setSending] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const isTheOwner = user.username === recipe?.user?.username;

  const router = useRouter();
  const navigation = useNavigation();

  const getRecipe = async () => {
    try {
      setLoading(true);
      // search for recipe in the store
      const recipeFound = allRecipes.find(
        (r) => r._id.toString() === id.toString()
      );

      if (recipeFound) {
        recipeFound.isFavorite = recipesFavorited.includes(id.toString());
        setRecipe(recipeFound);
        return;
      }

      // if not found, get it from the API
      const res = await getRecipeRequest(token, id);
      const data = await res.json();

      if (!res.ok) {
        return Toast.show({
          type: "error",
          text1: "Error",
          text2: "No se pudo obtener la receta",
          position: "top",
          text1Style: { fontSize: 14 },
        });
      }

      if (!data.recipe) {
        return Toast.show({
          type: "error",
          text1: "Error",
          text2: "No se pudo obtener la receta",
          position: "top",
          text1Style: { fontSize: 14 },
        });
      }

      setRecipe(data.recipe);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo obtener la receta",
        position: "top",
        text1Style: { fontSize: 14 },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async () => {
    try {
      // if the user is the owner, dont do anything
      if (isTheOwner) {
        return Toast.show({
          type: "info",
          text1: "Información",
          text2: "No puedes marcar tu propia receta como favorita",
          position: "top",
          text1Style: { fontSize: 14 },
        });
      }

      setLoadingFavorite(true);

      const res = await createDeleteFavorite(token, recipe._id);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Error al marcar la receta como favorita"
        );
      }

      recipe.isFavorite = data.isFavorite;
      recipe.favoriteCount = data.favoriteCount;

      // update favorites list of the store
      handleFavoriteStore(recipe._id.toString(), data.isFavorite);
    } catch (error) {
      let message = error?.message || "Error al marcar la receta como favorita";
      Toast.show({
        type: "error",
        text1: "Error",
        text2: message,
        position: "top",
        text1Style: { fontSize: 14 },
      });
    } finally {
      setLoadingFavorite(false);
    }
  };

  const refreshRecipe = async () => {
    try {
      setRefreshing(true);
      const res = await getRecipeRequest(token, id);
      const data = await res.json();

      if (!res.ok) {
        return Toast.show({
          type: "error",
          text1: "Error",
          text2: "No se pudo obtener la receta",
          position: "top",
          text1Style: { fontSize: 14 },
        });
      }

      if (!data.recipe) {
        return Toast.show({
          type: "error",
          text1: "Error",
          text2: "No se pudo obtener la receta",
          position: "top",
          text1Style: { fontSize: 14 },
        });
      }

      setRecipe(data.recipe);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo obtener la receta",
        position: "top",
        text1Style: { fontSize: 14 },
      });
    } finally {
      setRefreshing(false);
    }
  };

  const uploadRecipe = async () => {
    try {
      if (sending || deleting) return;

      setSending(true);

      const image = await getImageData(recipe.image);

      const dataFormatted = {
        clientId: recipe._id,
        title: recipe.title,
        description: recipe.description,
        totalTime: recipe.totalTime,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        categories: recipe.categories,
        image,
      };

      const res = await createRecipe(dataFormatted, token);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al publicar la receta");
      }

      const newRecipe = data.recipe;

      // update recipe _id in the store
      if (newRecipe) {
        const newId = newRecipe._id.toString();
        await updateLocalRecipe(recipe._id, {
          ...recipe,
          _id: newId,
          uploaded: true,
        });

        recipe._id = newId;
        recipe.uploaded = true;
        navigation.setParams({ id: newId });
      }

      Toast.show({
        type: "success",
        text1: "Publicación exitosa",
        position: "top",
        text1Style: { fontSize: 14 },
      });
    } catch (error) {
      const message = error?.message || "No se pudo publicar la receta";
      Toast.show({
        type: "error",
        text1: "Error",
        text2: message,
        position: "top",
        text1Style: { fontSize: 14 },
      });
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (deleting || sending) return;

      setDeleting(true);

      // delete recipe data from the api if the user uploaded the recipe
      if (recipe.uploaded) {
        const res = await deleteRecipeRequest(token, recipe._id);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Error al eliminar la receta");
        } else {
          Toast.show({
            type: "success",
            text1: "Se ha eliminado la publicación de la receta...",
            position: "top",
            text1Style: { fontSize: 14 },
          });

          recipe.uploaded = false;
          await updateLocalRecipe(recipe._id, recipe);
        }
      }

      // delete image locally
      const uri = recipe.image;
      const imageDeleted = await deleteImage(uri);

      if (!imageDeleted) {
        throw new Error("Error al eliminar la imagen");
      }

      // delete recipe data from the store
      await deleteRecipe(recipe._id);

      Toast.show({
        type: "success",
        text1: "Eliminación exitosa",
        position: "top",
        text1Style: { fontSize: 14 },
      });

      router.replace("/");
    } catch (error) {
      const message = error?.message || "No se pudo eliminar la receta";
      Toast.show({
        type: "error",
        text1: "Error",
        text2: message,
        position: "top",
        text1Style: { fontSize: 14 },
      });
    } finally {
      setDeleting(false);
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      "¿Estás seguro de que quieres eliminar esta receta?",
      null,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: handleDelete,
          style: "destructive",
        },
      ]
    );
  };

  return {
    scrollY,
    backgroundColor,
    limitSteps,
    isTheOwner,

    recipe,
    getRecipe,
    loading,
    refreshRecipe,
    refreshing,

    handleFavorite,
    loadingFavorite,

    uploadRecipe,
    sending,

    confirmDelete,
    handleDelete,
    deleting,

    bottomSheetRef,
  };
}
