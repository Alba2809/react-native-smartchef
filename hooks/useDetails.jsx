import { useEffect, useRef, useState } from "react";
import { getRecipeRequest } from "../api/recipe";
import { Animated } from "react-native";
import useRecipeStore from "../store/recipeStore";
import Toast from "react-native-toast-message";
import useAuthStore from "../store/authStore";

export default function useDetails({ id }) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const backgroundColor = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ["transparent", "white"],
    extrapolate: "clamp",
  });

  const limitSteps = 3;

  const { allRecipes } = useRecipeStore();
  const { token } = useAuthStore();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) getRecipe();
  }, [loading]);

  const getRecipe = async () => {
    try {
      setLoading(true);
      // search for recipe in the store
      const recipeFound = allRecipes.find((r) => parseInt(r._id) === parseInt(id));

      if (recipeFound) {
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

  return {
    scrollY,
    backgroundColor,
    limitSteps,
    recipe,
    loading,
  };
}