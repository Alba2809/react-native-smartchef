import { useCallback, useReducer, useRef, useState } from "react";
import { getRecipesRequest } from "../api/recipe";
import useAuthStore from "../store/authStore";
import Toast from "react-native-toast-message";

export default function useSearch() {
  const { token } = useAuthStore();
  const [recipes, setRecipes] = useState([]);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filtersState, updateFilters] = useReducer(
    (prev, next) => ({ ...prev, ...next }),
    {
      title: "",
      categories: [],
    }
  );
  const flatListRef = useRef(null);

  const loadRecipes = useCallback(
    async ({ refresh = false, resetHasMore = false } = {}) => {
      try {
        const currentHasMore = resetHasMore ? true : hasMore;
        // if no more recipes or loading or is not the first load, return
        if (!currentHasMore || loading) return;

        setLoading(true);

        const currentPage = refresh ? 1 : page;

        const res = await getRecipesRequest({
          token,
          page: currentPage,
          limit: 10,
          title: filtersState.title || "",
          categories: filtersState.categories,
        });

        const data = await res.json();

        if (res.ok) {
          // if first load, set recipes state
          // else add new recipes to recipes state
          if (refresh) {
            flatListRef.current.scrollToOffset({ offset: 0 });
            setRecipes(data.recipes);
          } else {
            setRecipes((prev) => [...prev, ...data.recipes]);
          }

          setHasMore(page < data.totalPages);
          setTotalRecipes(data.totalRecipes);
          setPage(page + 1);
        }
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "No se pudo obtener las recetas",
          position: "top",
          text1Style: { fontSize: 14 },
        });
      } finally {
        setLoading(false);
      }
    },
    [token, page, loading, hasMore, filtersState]
  );

  const applyFilters = () => {
    loadRecipes({ refresh: true, resetHasMore: true });
  };

  const handleInputOnChange = (key) => (value) => {
    updateFilters({ [key]: value });
  };

  return {
    // recipes state
    recipes,
    loading,
    totalRecipes,
    flatListRef,

    // filters state
    filtersState,
    handleInputOnChange,

    // functions to load recipes
    loadRecipes,
    applyFilters,
    hasMore,
  };
}
