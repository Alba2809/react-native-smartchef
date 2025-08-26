import { useLocalSearchParams } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";
import { getRecipesByUserRequest } from "../../api/recipe";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import useAuthStore from "../../store/authStore";
import ProfileScreen from "../../components/users/ProfileScreen";

const PublicProfile = () => {
  const { username } = useLocalSearchParams();
  const { token } = useAuthStore();
  const [user, setUser] = useState();
  const [recipes, setRecipes] = useState([]);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchData = async (pageNum = 1) => {
    try {
      if (pageNum === 1) setLoading(true);

      const response = await getRecipesByUserRequest({
        token,
        username,
        page: pageNum,
        limit: 10,
      });
      const data = await response.json();

      if (!response.ok || data.error)
        throw new Error(data.error || "No se pudieron obtener las recetas.");

      if (pageNum === 1) {
        setUser(data.user);
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
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (hasMore && !loading) {
      await fetchData(page + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ProfileScreen
      user={user}
      isTheOwner={false}
      goBackButton={true}
      onEndReached={handleLoadMore}
      hasMore={hasMore}
      totalRecipes={totalRecipes}
      recipes={recipes}
    />
  );
};

export default PublicProfile;
