import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import LoadingPage from "../components/common/LoadingPage";
import useAuthStore from "@/store/authStore";
import useCategoryStore from "@/store/categoryStore";
import useFavoriteStore from "@/store/favoriteStore";

export default function Initializer() {
  const { checkAuth, user, token } = useAuthStore();
  const { getCategories } = useCategoryStore();
  // const { loadFavorites } = useFavoriteStore();
  const router = useRouter();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      // check if user is logged in
      await checkAuth();

      // get categories
      await getCategories();

      // load favorites
      // await loadFavorites();

      setIsReady(true);
    };
    init();
  }, []);

  useEffect(() => {
    if (!isReady) return;

    if (user && token) {
      router.replace("/(tabs)");
    } else {
      router.replace("/(auth)");
    }
  }, [isReady, user, token]);

  return <LoadingPage />;
}
