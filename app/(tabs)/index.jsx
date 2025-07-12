import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  // Image,
  TextInput,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import useCategoryStore from "../../store/categoryStore";
import styles from "../../assets/styles/home.styles";
import COLORS from "../../constants/colors";
import useHome from "../../hooks/useHome";
import RecipeCard from "../../components/RecipeCard";
import useRecipeStore from "../../store/recipeStore";
import { useEffect } from "react";

export default function index() {
  const { user, baseFilter, FILTER_OPTIONS, setBaseFilter, allRecipes } = useHome();
  const { categories } = useCategoryStore();

  const testRecipes = [
    {
      _id: 1,
      title: "Pasta Casbonara Clásica",
      description:
        "Una receta de pan con tomate, una receta de pan con tomate una receta de pan con tomate una receta de pan con tomate una receta de pan con tomate",
      image: require("../../assets/images/pasta.jpeg"),
      totalTime: 10,
      ingredients: ["Tomate", "Agua"],
      steps: ["Paso 1", "Paso 2", "Paso 3"],
      categories: ["Entrantes", "Recetas de cocina"],
      user: {
        username: "John Doe",
      },
    },
    {
      _id: 2,
      title: "Pasta Casbonara Clásica",
      description:
        "Una receta de pan con tomate, una receta de pan con tomate una receta de pan con tomate una receta de pan con tomate una receta de pan con tomate",
      image: require("../../assets/images/pasta.jpeg"),
      totalTime: 10,
      ingredients: ["Tomate", "Agua"],
      steps: ["Paso 1", "Paso 2", "Paso 3"],
      categories: ["Entrantes", "Recetas de cocina"],
      user: {
        username: "John Doe",
      },
    },
    {
      _id: 3,
      title: "Pasta Casbonara Clásica",
      description:
        "Una receta de pan con tomate, una receta de pan con tomate una receta de pan con tomate una receta de pan con tomate una receta de pan con tomate",
      image: require("../../assets/images/pasta.jpeg"),
      totalTime: 10,
      ingredients: ["Tomate", "Agua"],
      steps: ["Paso 1", "Paso 2", "Paso 3"],
      categories: ["Entrantes", "Recetas de cocina"],
      user: {
        username: "John Doe",
      },
    },
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        {/* Header */}
        {/* <Animated.View
          style={{
            position: "absolute",
            flexDirection: "column",
            backgroundColor: COLORS.background,
            gap: 8,
            top: 0,
            right: 16,
            left: 16,
            paddingBottom: 12,
            zIndex: 1,
            transform: [
              {
                translateY: headerTranslateY,
              },
            ],
          }}
        > */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          // style={styles.containerAI}
          style={styles.linearGradient}
        >
          <View style={styles.headerLeftContainer}>
            <Image
              source={require("../../assets/images/icon.png")}
              style={styles.headerIconApp}
            />
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerAppName}>SmartChef</Text>
              <Text style={styles.headerGreeting}>
                Buen día, {user.username || "Invitado"}
              </Text>
            </View>
          </View>
          <View style={styles.headerUserContainer}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={COLORS.border}
            />
            <Image
              source={user.avatar}
              style={styles.headerUserIcon}
            />
          </View>
        </LinearGradient>

        {/* Search bar with filter and tags */}
        <View style={styles.filterContainer}>
          {/* Search bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar receta..."
              placeholderTextColor={COLORS.placeholderText}
            />
            <Ionicons name="filter-outline" size={20} />
          </View>

          {/* Tags */}
          <View style={styles.tagsContainer}>
            {Object.keys(FILTER_OPTIONS).map((key) => {
              const value = FILTER_OPTIONS[key];
              const isActive = baseFilter === value;
              return (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.tagButton,
                    {
                      backgroundColor: isActive ? COLORS.primary : "lightgray",
                    },
                  ]}
                  onPress={() => setBaseFilter(value)}
                >
                  <Text
                    style={[
                      styles.tagText,
                      {
                        color: isActive ? COLORS.white : COLORS.textDark,
                        fontWeight: isActive ? "bold" : "normal",
                      },
                    ]}
                  >
                    {value}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {/* </Animated.View> */}

        {/* Empty list */}
        {allRecipes.length === 0 && (
          <View style={{
          }}>
            <Text style={{
              fontSize: 14,
              color: COLORS.textDark,
            }}>
              Aún no tienes ninguna receta guardada...
            </Text>
          </View>
        )}

        {/* Recipes list */}
        <Animated.FlatList
          data={allRecipes}
          renderItem={({ item }) => <RecipeCard item={item} user={user} />}
          keyExtractor={(item, index) => index.toString()}
          scrollEventThrottle={16}
          /* onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )} */
          style={{ flex: 1, borderRadius: 14, paddingBottom: 10 }}
          contentContainerStyle={{ gap: 20 }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
