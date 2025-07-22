import { useCallback, useEffect, useReducer, useRef, useState } from "react";
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
      name: "",
      categories: [],
    }
  );

  const loadRecipes = useCallback(
    async ({ firstLoad = false }) => {
      try {
        if (!hasMore || loading) return;

        setLoading(true);

        const res = await getRecipesRequest({
          token,
          page,
          limit: 10,
          name: filtersState.name,
          categories: filtersState.categories,
        });

        const data = await res.json();

        if (res.ok) {
          // if first load, set recipes state
          // else add new recipes to recipes state
          if (firstLoad) {
            setRecipes(data.recipes);
          } else {
            setRecipes((prev) => [...prev, ...data.recipes]);
          }

          setHasMore(page < data.totalPages);
          setPage(page + 1);
          setTotalRecipes(data.totalRecipes);
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
    [token, hasMore, loading, filtersState.name, filtersState.categories]
  );

  const handleInputOnChange = (key) => (value) => {
    updateFilters({ [key]: value });
  };

  return {
    // recipes state
    recipes,
    loading,
    totalRecipes,

    // filters state
    filtersState,
    handleInputOnChange,

    // functions to load recipes
    loadRecipes,
    hasMore
  };
}
