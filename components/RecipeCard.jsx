import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import COLORS from "../constants/colors";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useCategoryStore from "../store/categoryStore";
import { useCallback, useMemo, memo } from "react";

const RecipeCard = memo(({ item, user = null, showHeart = false }) => {
  const { categories } = useCategoryStore();
  const router = useRouter();

  const redirectToRecipeDetails = useCallback(
    (itemId) => router.push(`/details/${itemId}`),
    [router]
  );

  return (
    <View style={styles.card}>
      {/* Imagen con tiempo */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.timeBadge}>
          <Text style={styles.timeText}>{item.totalTime} min</Text>
        </View>
        {showHeart && item.isFavorite && (
          <View style={styles.heartButton}>
            <Ionicons name="heart" size={23} color="red" />
          </View>
        )}
        {/* <View style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          backgroundColor: "#e9e9e8",
          borderRadius: 100,
          paddingHorizontal: 8,
          paddingVertical: 4,
        }}>
          <Text>{item.user.username}</Text>
        </View> */}
      </View>

      {/* Contenido */}
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={6}>
          {item.description}
        </Text>

        <CategoriesName
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

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const CategoriesName = memo(
  ({ recipeCategories, categoriesArray }) => {
    const itemsToShow = useMemo(() => {
      return recipeCategories
        .map((recipeCategory) => {
          const name =
            recipeCategory?.name ??
            categoriesArray.find(
              (c) => c._id.toString() === recipeCategory.toString()
            )?.name;

          return name ? capitalize(name) : null;
        })
        .filter(Boolean);
    }, [recipeCategories, categoriesArray]);

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesWrapper}
      >
        {itemsToShow.map((category, index) => (
          <View key={index} style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{category}</Text>
          </View>
        ))}
      </ScrollView>
    );
  },
  (prevProps, nextProps) =>
    prevProps.recipeCategories === nextProps.recipeCategories &&
    prevProps.categoriesArray === nextProps.categoriesArray
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 14,
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
    top: 8,
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
    backgroundColor: "#e9e9e8",
    borderRadius: 100,
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
    fontSize: 20,
    fontWeight: "500",
    color: "#2d3748",
  },
  description: {
    color: "#718096",
    fontWeight: "500",
    fontSize: 15,
    lineHeight: 22,
    minHeight: 50,
  },
  categoriesWrapper: {
    alignItems: "center",
    gap: 8,
  },
  categoryBadge: {
    backgroundColor: "#e9e9e8",
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  categoryText: {
    fontSize: 13,
    color: "gray",
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
