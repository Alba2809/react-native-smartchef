import { create } from "zustand";
import { getFavoritesRequest } from "../api/favorite";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FILTER_OPTIONS = {
  ALL: "Todas",
  SAVED: "Guardadas",
  MY_RECIPES: "Mis recetas",
};

const useRecipeStore = create((set, get) => ({
  recipesSaved: [],
  recipesAPI: [],
  allRecipes: [],

  getRecipesSaved: async ({
    title = "",
    categories = [],
    baseFilter = FILTER_OPTIONS.ALL,
    user = "",
  }) => {
    // if base filter is not 'All' or 'My recipes', then don't make the request

    if (baseFilter === FILTER_OPTIONS.SAVED) {
      set({ recipesSaved: [] });
      return;
    }

    // get recipes from local storage
    const recipesJson = await AsyncStorage.getItem("recipes");
    const recipes = recipesJson ? JSON.parse(recipesJson) : [];

    // filter recipes by title, categories, and (optionally) user
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

      // if base filter is 'My recipes', check if the recipe was created by the user
      const userMatch =
        baseFilter === FILTER_OPTIONS.MY_RECIPES
          ? recipe.user?.username === user
          : true;

      return titleMatch && categoriesMatch && userMatch;
    });

    set({ recipesSaved: filteredRecipes });
  },

  getFavorites: async ({
    token,
    title = "",
    categories = [],
    baseFilter = FILTER_OPTIONS.ALL,
  }) => {
    // if base filter is not 'All' or 'Saved', then don't make the request

    if (baseFilter === FILTER_OPTIONS.MY_RECIPES) {
      set({ recipesAPI: [] });
      return;
    }

    // else make the request
    const res = await getFavoritesRequest({ token, categories, title });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Error al obtener las recetas en la nube");
    }

    set({ recipesAPI: data.recipes });
  },

  saveLocalRecipe: async (data) => {
    const recipesSaved = get().recipesSaved;
    await AsyncStorage.setItem(
      "recipes",
      JSON.stringify([data, ...recipesSaved])
    );

    set({ recipesSaved: [data, ...recipesSaved] });
    get().formatRecipes();
  },

  deleteRecipe: async (id) => {
    const recipesSaved = get().recipesSaved;

    const index = recipesSaved.findIndex((r) => r._id === id);

    if (index === -1) {
      throw new Error("No se encontró la receta");
    }

    recipesSaved.splice(index, 1);

    await AsyncStorage.setItem("recipes", JSON.stringify(recipesSaved));

    set({ recipesSaved });
  },

  updateLocalRecipe: async (id, newData) => {
    const recipesSaved = get().recipesSaved;

    const index = recipesSaved.findIndex((r) => r._id === id);

    if (index === -1) {
      throw new Error("No se encontró la receta");
    }

    const newRecipes = [...recipesSaved];
    newRecipes[index] = newData;

    await AsyncStorage.setItem("recipes", JSON.stringify(newRecipes));

    set({ recipesSaved: newRecipes });
    get().formatRecipes();
  },

  getAllRecipes: async ({
    token,
    title = "",
    categories = [],
    baseFilter = FILTER_OPTIONS.ALL,
    user = "",
  }) => {
    await Promise.all([
      get().getRecipesSaved({
        title,
        categories,
        baseFilter,
        user,
      }),
      get().getFavorites({
        token,
        title,
        categories,
        baseFilter,
      }),
    ]);

    get().formatRecipes();
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
