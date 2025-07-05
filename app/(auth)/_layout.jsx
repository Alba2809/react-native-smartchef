import { Stack, useRouter } from "expo-router";
import useAuthStore from "../../store/authStore";
import { useEffect } from "react";

export default function AuthLayout() {
  const router = useRouter();
  const { user, token } = useAuthStore();

  useEffect(() => {
    if (user && token) {
      router.replace("/(tabs)");
    }
  }, [user, token]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
