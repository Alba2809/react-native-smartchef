import { Image } from "expo-image";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { smallDateFormat } from "../../utils/dateFormat.js";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import COLORS from "../../constants/colors";
import useAuthStore from "../../store/authStore";

const ProfileScreen = ({
  user,
  isTheOwner,
  goBackButton = false,
  onEndReached = null,
  hasMore = false,
  totalRecipes = null,
  recipes = [],
}) => {
  const { logout } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const insetTop = useSafeAreaInsets().top;

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

  const handleEndReached = () => {
    if (onEndReached) {
      onEndReached();
    }
  };

  const goBack = () => {
    router.back();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
      }}
    >
      {goBackButton && (
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            backgroundColor: "white",
            paddingTop: insetTop + 10,
            elevation: 3,
            shadowColor: COLORS.black,
            marginBottom: 15,
          }}
        >
          <TouchableOpacity onPress={goBack}>
            <Ionicons
              name="arrow-back-outline"
              size={24}
              color={COLORS.textDark}
            />
          </TouchableOpacity>
        </View>
      )}
      {isLoggingOut ? (
        <ActivityIndicator size={"large"} color={COLORS.primary} />
      ) : user ? (
        <FlatList
          data={recipes}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item._id.toString()}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          contentContainerStyle={{
            gap: 10,
            padding: 16,
            paddingTop: goBackButton ? 0 : insetTop + 16,
            paddingBottom: 25,
          }}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          ListHeaderComponent={
            <HeaderComponent
              user={user}
              isTheOwner={isTheOwner}
              handleLogout={handleLogout}
              isLoggingOut={isLoggingOut}
              recipesLength={totalRecipes || recipes.length}
            />
          }
          ListFooterComponent={
            hasMore &&
            recipes.length > 0 && (
              <ActivityIndicator
                size="large"
                color={COLORS.primary}
                style={{
                  alignSelf: "center",
                }}
              />
            )
          }
          ListEmptyComponent={
            <Text
              style={{
                fontSize: 15,
                color: COLORS.textSecondary,
                paddingHorizontal: 10,
              }}
            >
              No se hay resultados...
            </Text>
          }
        />
      ) : (
        <NonexistedUser />
      )}
    </View>
  );
};

const renderRecipeItem = ({ item }) => {
  const router = useRouter();

  const redirectToRecipeDetails = (itemId) => router.push(`/details/${itemId}`);

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        gap: 10,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 14,
        shadowColor: COLORS.black,
        elevation: 2,
      }}
      onPress={() => redirectToRecipeDetails(item._id)}
    >
      <Image
        source={{
          uri: item.image,
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
          {item.title}
        </Text>
        <Text
          style={{ fontSize: 14, color: COLORS.textSecondary }}
          numberOfLines={3}
        >
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const HeaderComponent = ({
  user,
  isTheOwner,
  handleLogout,
  isLoggingOut,
  recipesLength,
}) => {
  return (
    <View style={{ flexDirection: "column", gap: 10 }}>
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

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            fontSize: 18,
            color: COLORS.textDark,
            fontWeight: "bold",
          }}
        >
          {recipesLength === 0 ? "Sin creaciones" : `Tus creaciones`}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: COLORS.textSecondary,
          }}
        >
          {recipesLength} recetas
        </Text>
      </View>
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
        Información del usuario no encontrado
      </Text>
    </View>
  );
};

export default ProfileScreen;
