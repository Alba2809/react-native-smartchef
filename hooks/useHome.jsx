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

  /* const formatRecipe = () => {
    const all = [...get().recipesSaved, ...get().recipesAPI];
    // delete duplicates by id
    const unique = Array.from(new Map(all.map((r) => [r._id, r])).values());

    // sort by createdAt descending
    const sorted = unique.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

    set({ allRecipes: sorted });
  }; */

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
