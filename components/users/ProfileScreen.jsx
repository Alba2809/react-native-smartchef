import { Image } from "expo-image";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { smallDateFormat } from "../../utils/dateFormat.js";
import { useState } from "react";
import COLORS from "../../constants/colors";
import useAuthStore from "../../store/authStore";
import { useRouter } from "expo-router";

const ProfileScreen = ({ user, isTheOwner, recipes = [] }) => {
  const { logout } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      router.replace("/(auth)");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
      }}
    >
      {isLoggingOut ? (
        <ActivityIndicator size={"large"} color={COLORS.primary} />
      ) : user ? (
        <ScrollView
          contentContainerStyle={{ gap: 10, padding: 16 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              gap: 10,
              padding: 12,
              borderRadius: 14,
              elevation: 3,
              shadowColor: COLORS.black,
            }}
          >
            <Image
              source={{
                uri: user.avatar,
              }}
              style={{
                width: 70,
                height: 70,
                borderRadius: 100,
              }}
            />
            <View style={{ flex: 1, flexDirection: "column", gap: 3 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: COLORS.textDark,
                }}
              >
                {user.username}
              </Text>
              <View style={{ flexDirection: "column", gap: 2 }}>
                <Text style={{ fontSize: 14, color: COLORS.textSecondary }}>
                  {user.email}
                </Text>
                <Text style={{ fontSize: 14, color: COLORS.textSecondary }}>
                  Creado el {smallDateFormat(user.createdAt)}
                </Text>
              </View>
            </View>
          </View>

          {isTheOwner && (
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: COLORS.primary,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                elevation: 3,
                shadowColor: COLORS.black,
              }}
              onPress={handleLogout}
              disabled={isLoggingOut}
            >
              <Ionicons name="log-out-outline" size={24} color="white" />
              <Text style={{ fontSize: 14, color: "white", fontWeight: "500" }}>
                Cerrar sesión
              </Text>
            </TouchableOpacity>
          )}

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: 18,
                color: COLORS.textDark,
                fontWeight: "bold",
              }}
            >
              {recipes.length === 0 ? "Sin creaciones" : `Tus creaciones`}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: COLORS.textSecondary,
              }}
            >
              {recipes.length} recetas
            </Text>
          </View>

          <View style={{ flex: 1, flexDirection: "column", gap: 10 }}>
            {recipes.map((recipe, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  gap: 10,
                  backgroundColor: "white",
                  padding: 10,
                  borderRadius: 14,
                  shadowColor: COLORS.black,
                  elevation: 2,
                }}
              >
                <Image
                  source={{
                    uri: recipe.image,
                  }}
                  style={{
                    height: 80,
                    width: 100,
                    borderRadius: 10,
                  }}
                  contentFit="cover"
                  transition={500}
                />
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: COLORS.textPrimary,
                    }}
                  >
                    {recipe.title}
                  </Text>
                  <Text
                    style={{ fontSize: 14, color: COLORS.textSecondary }}
                    numberOfLines={3}
                  >
                    {recipe.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <NonexistedUser />
      )}
    </View>
  );
};

const NonexistedUser = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
      }}
    >
      <Text
        style={{ fontSize: 18, fontWeight: "bold", color: COLORS.textDark }}
      >
        Usuario no encontrado
      </Text>
    </View>
  );
};

export default ProfileScreen;
