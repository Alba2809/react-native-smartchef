import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import LoadingPage from "../components/common/LoadingPage";
import useAuthStore from "@/store/authStore";
import useCategoryStore from "@/store/categoryStore";

export default function Initializer() {
  const { checkAuth, user, token } = useAuthStore();
  const { getCategories } = useCategoryStore();
  const router = useRouter();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      // check if user is logged in
      await checkAuth();

      // get categories
      await getCategories();

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
