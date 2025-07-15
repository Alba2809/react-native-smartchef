import { useEffect, useRef, useState } from "react";
import useAuthStore from "../store/authStore";
import { Animated } from "react-native";
import useRecipeStore from "../store/recipeStore";

const FILTER_OPTIONS = {
  ALL: "Todas",
  SAVED: "Guardadas",
  MY_RECIPES: "Mis recetas",
};

/**
 * @returns {{
 *   user: any,
 *   baseFilter: string,
 *   setBaseFilter: function,
 *   FILTER_OPTIONS: { ALL: string, SAVED: string, MY_RECIPES: string }
 * }}
 */
export default function useHome() {
  const { user, token } = useAuthStore();
  const [baseFilter, setBaseFilter] = useState(FILTER_OPTIONS.ALL);

  const { getFavorites, getRecipesSaved, allRecipes } = useRecipeStore();

  // const allRecipes = formatRecipe();

  useEffect(() => {
    Promise.all([
      getFavorites(token),
      getRecipesSaved(),
    ]);
  }, []);

  return {
    user,

    /* Base filter tags */
    baseFilter,
    setBaseFilter,
    FILTER_OPTIONS,

    /* Recipes */
    allRecipes,
  };
}
