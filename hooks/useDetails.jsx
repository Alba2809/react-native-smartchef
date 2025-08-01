import { useEffect, useRef, useState } from "react";
import { getRecipeRequest } from "../api/recipe";
import { Animated } from "react-native";
import useRecipeStore from "../store/recipeStore";
import Toast from "react-native-toast-message";
import useAuthStore from "../store/authStore";
import { createDeleteFavorite } from "../api/favorite";
import useFavoriteStore from "../store/favoriteStore";

export default function useDetails({ id }) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const backgroundColor = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ["transparent", "white"],
    extrapolate: "clamp",
  });

  const limitSteps = 3;

  const { allRecipes } = useRecipeStore();
  const { handleFavorite: handleFavoriteStore, recipesFavorited } =
    useFavoriteStore();
  const { token, user } = useAuthStore();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);
  const isTheOwner = user.username === recipe?.user?.username;

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
      console.log(error);
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
      console.log(error);
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
  };
}
