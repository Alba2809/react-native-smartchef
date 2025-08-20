import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image, ImageBackground } from "expo-image";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, memo } from "react";
import COLORS from "../../constants/colors";
import useCategoryStore from "../../store/categoryStore";
import CategoriesList from "./CategoriesList";

const RecipeCard = memo(({ item, localusername = null, showHeart = false }) => {
  const { categories } = useCategoryStore();
  const router = useRouter();

  const redirectToRecipeDetails = useCallback(
    (itemId) => router.push(`/details/${itemId}`),
    [router]
  );

  const userText = (recipeUser) =>
    `por ${recipeUser}${recipeUser === localusername ? " (tú)" : ""}`;

  return (
    <View style={styles.card}>
      {/* Imagen con tiempo */}
      <View
        style={{
          width: "100%",
          paddingVertical: 10,
          paddingLeft: 8,
          paddingRight: 58,
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Image
          source={{ uri: item?.user?.avatar }}
          style={{
            width: 40,
            height: 40,
            backgroundColor: COLORS.white,
            borderRadius: 100,
          }}
          transition={500}
        />
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text
            style={{
              fontSize: 14,
              color: COLORS.placeholderText,
              fontWeight: "500",
            }}
          >
            {userText(item.user.username)}
          </Text>
        </View>

        {showHeart && (
          <View style={styles.heartButton}>
            <Ionicons name="heart" size={23} color="red" />
          </View>
        )}
      </View>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.imageWrapper}
        transition={500}
      >
        <View style={styles.timeBadge}>
          <Text style={styles.timeText}>{item.totalTime} min</Text>
        </View>
      </ImageBackground>

      {/* Contenido */}
      <View style={styles.content}>
        <Text style={styles.description} numberOfLines={6}>
          {item.description}
        </Text>

        <CategoriesList
          recipeCategories={item.categories}
          categoriesArray={categories}
        />

        <View style={styles.divider} />

        <TouchableOpacity
          onPress={() => redirectToRecipeDetails(item._id)}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>Ver receta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  imageWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  timeBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    position: "absolute",
    left: 8,
    bottom: 8,
  },
  timeText: {
    fontSize: 13,
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "bold",
  },
  heartButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#eeeeeeff",
    borderRadius: "100%",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 16,
    flex: 1,
    flexDirection: "column",
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1c222cff",
  },
  description: {
    color: "#718096",
    fontWeight: "500",
    fontSize: 15,
    lineHeight: 22,
    minHeight: 50,
  },
  divider: {
    borderTopWidth: 1,
    borderColor: "lightgray",
    width: "100%",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.primary,
    textAlign: "center",
  },
});

export default RecipeCard;
