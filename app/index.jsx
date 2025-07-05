import LoadingPage from "@/components/LoadingPage";
import useAuthStore from "@/store/authStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function Initializer() {
  const router = useRouter();
  const { checkAuth, user, token } = useAuthStore();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await checkAuth();
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
