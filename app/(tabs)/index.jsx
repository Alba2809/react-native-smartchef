import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  TextInput,
  Animated,
  Button,
} from "react-native";
import { useCallback, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../assets/styles/home.styles";
import COLORS from "../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import useHome from "../../hooks/useHome";
import RecipeCard from "../../components/RecipeCard";

export default function index() {
  const { user, baseFilter, FILTER_OPTIONS, setBaseFilter } = useHome();

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
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.background,
          padding: 16,
          gap: 10,
        }}
      >
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
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 8,
            borderRadius: 14,
            shadowColor: COLORS.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Image
              source={require("../../assets/images/icon.png")}
              style={{
                width: 45,
                height: 45,
              }}
            />
            <View
              style={{
                flexDirection: "column",
                alignSelf: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "JetBrainsMono-Medium",
                  fontWeight: "bold",
                  color: COLORS.white,
                }}
              >
                SmartChef
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "JetBrainsMono-Medium",
                  color: COLORS.textPrimary,
                }}
              >
                Buen día, {user.username || "Invitado"}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color={COLORS.border}
            />
            <Image
              source={require("../../assets/images/icon.png")}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </View>
        </LinearGradient>

        {/* Search bar with filter and tags */}
        <View
          style={{
            flexDirection: "column",
            padding: 8,
            gap: 14,
            backgroundColor: COLORS.white,
            borderRadius: 14,
            shadowColor: COLORS.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          {/* Search bar */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              backgroundColor: COLORS.inputBackground,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: COLORS.border,
              paddingHorizontal: 8,
            }}
          >
            <Ionicons name="search-outline" size={20} />
            <TextInput
              style={{
                fontSize: 14,
                fontFamily: "JetBrainsMono-Medium",
                color: COLORS.textDark,
                flex: 1,
              }}
              placeholder="Buscar receta..."
              placeholderTextColor={COLORS.placeholderText}
            />
            <Ionicons name="filter-outline" size={20} />
          </View>

          {/* Tags */}
          <View style={{ flexDirection: "row", gap: 8 }}>
            {Object.keys(FILTER_OPTIONS).map((key) => {
              const value = FILTER_OPTIONS[key];
              const isActive = baseFilter === value;
              return (
                <TouchableOpacity
                  key={key}
                  style={{
                    backgroundColor: isActive ? COLORS.primary : "lightgray",
                    borderRadius: 14,
                    flex: 1,
                    paddingVertical: 6,
                  }}
                  onPress={() => setBaseFilter(value)}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "JetBrainsMono-Medium",
                      color: isActive ? COLORS.white : COLORS.textDark,
                      textAlign: "center",
                      fontWeight: isActive ? "bold" : "normal",
                    }}
                  >
                    {value}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {/* </Animated.View> */}

        {/* Recipes list */}
        <Animated.FlatList
          data={testRecipes}
          renderItem={({ item }) => <RecipeCard item={item} />}
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
