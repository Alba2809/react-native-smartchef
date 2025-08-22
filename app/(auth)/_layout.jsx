import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";

export default function AuthLayout() {
  const router = useRouter();
  const { user, token, checkAuth } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      // check if user is logged in
      await checkAuth();

      setIsReady(true);
    };
    init();
  }, []);

  useEffect(() => {
    if (!isReady) return;

    if (user && token) {
      router.replace("/(tabs)");
    }
  }, [isReady, user, token]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
