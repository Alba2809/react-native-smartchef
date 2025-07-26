import { create } from "zustand";
import { getFavoritesRequest } from "../api/favorite";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useRecipeStore = create((set, get) => ({
  recipesSaved: [],
  recipesAPI: [],
  allRecipes: [],

  recipesSavedLoaded: false,
  recipesAPILoaded: false,

  getRecipesSaved: async ({ title = "", categories = [] }) => {
    try {
      // get recipes from local storage
      const recipesJson = await AsyncStorage.getItem("recipes");
      const recipes = recipesJson ? JSON.parse(recipesJson) : [];

      // filter recipes by title and categories
      const filteredRecipes = recipes.filter((recipe) => {
        const titleMatch = recipe.title
          .toLowerCase()
          .includes(title.toLowerCase());

        // if the recipe has at least one category
        // change some for every to check if all categories match
        const categoriesMatch =
          categories.length === 0
            ? true
            : recipe.categories.some((cat) => categories.includes(cat));

        return titleMatch && categoriesMatch;
      });

      set({ recipesSaved: filteredRecipes });
    } catch (error) {
      console.log(error);
    } finally {
      set({ recipesSavedLoaded: true });
      if (get().recipesAPILoaded) get().formatRecipes();
    }
  },

  getFavorites: async ({ token, title = "", categories = [] }) => {
    try {
      const res = await getFavoritesRequest({ token, categories, title });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Error al obtener las recetas en la nube"
        );
      }

      set({ recipesAPI: data.recipes });
    } catch (error) {
      console.log(error);
    } finally {
      set({ recipesAPILoaded: true });
      if (get().recipesSavedLoaded) get().formatRecipes();
    }
  },

  saveLocalRecipe: async (data) => {
    try {
      const recipesSaved = get().recipesSaved;
      await AsyncStorage.setItem(
        "recipes",
        JSON.stringify([data, ...recipesSaved])
      );

      set({ recipesSaved: [data, ...recipesSaved] });
      get().formatRecipes();
    } catch (error) {
      console.log(error);
    }
  },

  deleteRecipes: async () => {
    try {
      await AsyncStorage.removeItem("recipes");

      set({ recipesSaved: [] });
    } catch (error) {
      console.log(error);
    }
  },

  formatRecipes: () => {
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
  },
}));

export default useRecipeStore;
