import { useReducer, useRef, useState } from "react";
import useAuthStore from "../store/authStore";
import useRecipeStore from "../store/recipeStore";
import CategoryFilter from "../components/CategoryFilter";

const FILTER_OPTIONS = {
  ALL: "Todas",
  SAVED: "Guardadas",
  MY_RECIPES: "Mis recetas",
};

const BottomSheetViews = {
  FILTERS: "FILTERS",
};

const BottomSheetConfig = {
  [BottomSheetViews.FILTERS]: {
    title: "Filtrar por categorías",
    snapPoints: ["40%"],
    content: (props) => (
      <CategoryFilter
        handleCategory={props.handleCategory}
        categoriesSelected={props.categories}
        applyFilters={props.applyFilters}
      />
    ),
  },
};

export default function useHome() {
  const { user, token } = useAuthStore();
  const [baseFilter, setBaseFilter] = useState(FILTER_OPTIONS.ALL);
  const [filtersState, updateFilters] = useReducer(
    (prev, next) => ({ ...prev, ...next }),
    {
      title: "",
      categories: [],
    }
  );

  const { allRecipes, getAllRecipes } = useRecipeStore();

  const flatListRef = useRef(null);

  const handleInputOnChange = (key) => (value) => {
    updateFilters({ [key]: value });
  };

  const handleCategory = (category) => {
    /* Add category to categories array, if it doesn't exist, otherwise remove it */
    const { categories } = filtersState;
    if (categories.includes(category)) {
      const filtered = categories.filter((c) => c !== category);
      updateFilters({ categories: filtered });
    } else {
      updateFilters({ categories: [...categories, category] });
    }
  };

  const applyFilters = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    // if base filter is 'All', load getRecipesSaved and getFavorites
    // if base filter is 'Saved', load just getRecipesSaved
    // if base filter is 'My recipes', load just getRecipesSaved created by the user
    getAllRecipes({
      token,
      title: filtersState.title,
      categories: filtersState.categories,
      baseFilter,
      user: user.username,
    });
  };

  return {
    user,
    token,
    flatListRef,

    /* Base filter tags */
    baseFilter,
    setBaseFilter,
    handleCategory,
    handleInputOnChange,
    filtersState,
    FILTER_OPTIONS,
    applyFilters,

    /* Recipes */
    allRecipes,
    getAllRecipes,

    // Bottom sheet
    BottomSheetViews,
    BottomSheetConfig,
  };
}
