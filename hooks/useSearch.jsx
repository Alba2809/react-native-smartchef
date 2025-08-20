import { useReducer, useRef, useState } from "react";
import { getRecipesRequest } from "../api/recipe";
import useAuthStore from "../store/authStore";
import Toast from "react-native-toast-message";
import CategoryFilter from "../components/common/CategoryFilter";

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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function useSearch() {
  const { token, user } = useAuthStore();

  const [recipes, setRecipes] = useState([]);
  const [totalRecipes, setTotalRecipes] = useState(0);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [filtersState, updateFilters] = useReducer(
    (prev, next) => ({ ...prev, ...next }),
    {
      title: "",
      categories: [],
    }
  );
  const flatListRef = useRef(null);

  const fetchRecipes = async (pageNum = 1, refresh = false) => {
    try {
      if (refresh) setRefreshing(true);
      else if (pageNum === 1) setLoading(true);

      const response = await getRecipesRequest({
        token,
        page: pageNum,
        limit: 10,
        title: filtersState.title || "",
        categories: filtersState.categories,
      });
      const data = await response.json();

      if (!response.ok || data.error)
        throw new Error(data.error || "No se pudieron obtener las recetas.");

      if (refresh || pageNum === 1) {
        setRecipes(data.recipes);
      } else {
        const uniqueRecipes = Array.from(
          new Set([...recipes, ...data.recipes].map((recipe) => recipe._id))
        ).map((id) =>
          [...recipes, ...data.recipes].find((recipe) => recipe._id === id)
        );

        setRecipes(uniqueRecipes);
      }

      setHasMore(pageNum < data.totalPages);
      setTotalRecipes(data.totalRecipes);
      setPage(pageNum);
    } catch (error) {
      console.log("Error fetching books", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudieron obtener las recetas",
        position: "top",
        text1Style: { fontSize: 14 },
      });
    } finally {
      if (refresh) {
        // added a delay to give the feeling of a refresh
        await sleep(800);
        setRefreshing(false);
      } else setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (hasMore && !loading && !refreshing) {
      await fetchRecipes(page + 1);
    }
  };

  const applyFilters = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    fetchRecipes(1);
  };

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

  return {
    user,

    // recipes state
    recipes,
    totalRecipes,
    flatListRef,
    
    // filters state
    filtersState,
    handleInputOnChange,
    handleCategory,
    
    // functions to load recipes
    applyFilters,
    fetchRecipes,
    handleLoadMore,
    loading,
    refreshing,
    hasMore,

    // Bottom sheet
    BottomSheetViews,
    BottomSheetConfig,
  };
}
