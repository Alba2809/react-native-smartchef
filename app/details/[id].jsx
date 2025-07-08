import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import COLORS from "../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useRef, useState } from "react";
import BottomSheetManager from "../../components/BottomSheetManager";
import IngredientsList from "../../components/IngredientsList";
import StepsList from "../../components/StepsList";
import useBottomSheet from "../../hooks/useBottomSheet";

const BottomSheetViews = {
  INGREDIENTS: "INGREDIENTS",
  STEPS: "STEPS",
};

const BottomSheetConfig = {
  [BottomSheetViews.INGREDIENTS]: {
    title: "Ingredientes",
    snapPoints: ["70%"],
    content: (props) => <IngredientsList ingredients={props.ingredients} />,
  },
  [BottomSheetViews.STEPS]: {
    title: "Pasos de preparación",
    snapPoints: ["70%"],
    content: (props) => <StepsList steps={props.steps} playStep={true} />,
  },
};

const testData = {
  title: "Pasta Casbonara Clásica",
  description:
    "Una receta de pan con tomate, una receta de pan con tomate una receta de pan con tomate una receta de pan con tomate una receta de pan con tomate",
  image: require("../../assets/images/pasta.jpeg"),
  totalTime: 10,
  ingredients: [
    {
      name: "Tomate",
      amount: "1",
      unit: "Kg",
    },
    {
      name: "Agua",
      amount: "1",
      unit: "Kg",
    },
    {
      name: "Sal",
      amount: "1",
      unit: "Kg",
    },
    {
      name: "Tomate",
      amount: "1",
      unit: "Kg",
    },
    {
      name: "Agua",
      amount: "1",
      unit: "Kg",
    },
    {
      name: "Sal",
      amount: "1",
      unit: "Kg",
    },
    {
      name: "Tomate",
      amount: "1",
      unit: "Kg",
    },
    {
      name: "Agua",
      amount: "1",
      unit: "Kg",
    },
    {
      name: "Sal",
      amount: "1",
      unit: "Kg",
    },
    {
      name: "Tomate",
      amount: "1",
      unit: "Kg",
    },
    {
      name: "Agua",
      amount: "1",
      unit: "Kg",
    },
    {
      name: "Sal",
      amount: "1",
      unit: "Kg",
    },
  ],
  steps: [
    {
      number: 1,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, asperiores reiciendis possimus, error, cum quos accusamus vero tempora soluta perferendis modi debitis voluptas iste enim doloribus corporis pariatur rem at. Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, asperiores reiciendis possimus, error, cum quos accusamus vero tempora soluta perferendis modi debitis voluptas iste enim doloribus corporis pariatur rem at. Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, asperiores reiciendis possimus, error, cum quos accusamus vero tempora soluta perferendis modi debitis voluptas iste enim doloribus corporis pariatur rem at.",
      duration: 10,
    },
    {
      number: 2,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, asperiores reiciendis possimus, error, cum quos accusamus vero tempora soluta perferendis modi debitis voluptas iste enim doloribus corporis pariatur rem at.",
      duration: 10,
    },
    {
      number: 3,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, asperiores reiciendis possimus, error, cum quos accusamus vero tempora soluta perferendis modi debitis voluptas iste enim doloribus corporis pariatur rem at.",
      duration: 10,
    },
    {
      number: 4,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, asperiores reiciendis possimus, error, cum quos accusamus vero tempora soluta perferendis modi debitis voluptas iste enim doloribus corporis pariatur rem at.",
      duration: 10,
    },
    {
      number: 5,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, asperiores reiciendis possimus, error, cum quos accusamus vero tempora soluta perferendis modi debitis voluptas iste enim doloribus corporis pariatur rem at.",
      duration: 10,
    },
  ],
  categories: ["Entrantes", "Recetas de cocina"],
  user: {
    username: "John Doe",
  },
  likes: 10,
};

const DetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const scrollY = useRef(new Animated.Value(0)).current;
  const backgroundColor = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ["transparent", "white"],
    extrapolate: "clamp",
  });

  const limitSteps = 3;

  const {
    handlePresentModalPress,
    bottomSheetRef,
    currentBsConfig,
    bottomSheetContent,
  } = useBottomSheet({
    BottomSheetViews,
    BottomSheetConfig,
    dataProps: {
      ingredients: testData.ingredients,
      steps: testData.steps,
    },
  });

  const goBack = () => {
    router.back();
  };

  return (
    <View
      style={{ flex: 1, flexDirection: "column", paddingBottom: insets.bottom + 5 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <Animated.View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 3,

          backgroundColor: backgroundColor,
          paddingHorizontal: 8,
          paddingTop: insets.top + 8,
          paddingBottom: 8,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "100%",
            width: 40,
            height: 40,
            padding: 8,
          }}
          onPress={goBack}
        >
          <Ionicons name="arrow-back" size={24} color={"black"} />
        </TouchableOpacity>
      </Animated.View>

      {/* Imagen */}
      <Image
        source={testData.image}
        style={{
          width: "100%",
          height: 250,
          zIndex: 1,
          position: "absolute",
          top: 0,
        }}
        resizeMode="cover"
      />

      <LinearGradient
        colors={["transparent", "#f2f2f2"]}
        locations={[0, 0.15]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100%",
          zIndex: 2,
        }}
        pointerEvents="none"
      />

      <Animated.ScrollView
        contentContainerStyle={{
          gap: 20,
        }}
        style={{
          flex: 1,
          marginTop: insets.top + 56,
          zIndex: 3,
          position: "relative",
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Basic info Card */}
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 14,
            padding: 16,
            marginHorizontal: 20,
            gap: 12,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              color: "#2d3748",
            }}
          >
            {testData.title}
          </Text>

          {/* user info */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Image
                source={require("../../assets/images/icon.png")}
                style={{ width: 35, height: 35 }}
              />
              <View style={{}}>
                <Text
                  style={{ fontSize: 14, fontWeight: "500", color: "#2d3748" }}
                >
                  por
                </Text>
                <Text style={{ fontSize: 14, fontWeight: "600" }}>
                  {testData.user.username}
                </Text>
              </View>
            </View>
            {/* Read the text */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                paddingVertical: 8,
                paddingHorizontal: 12,
                backgroundColor: "#fff2ed",
                borderRadius: 16,
              }}
            >
              <Ionicons name="volume-high" size={20} color={COLORS.primary} />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: COLORS.primary,
                }}
              >
                Reproducir
              </Text>
            </TouchableOpacity>
          </View>

          {/* Likes */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              gap: 8,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Ionicons name="heart" size={20} color="#ef4444" />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: COLORS.primary,
                }}
              >
                {testData.likes}
              </Text>
            </TouchableOpacity>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Ionicons name="time" size={20} color="gray" />
              <Text style={{ fontSize: 14, fontWeight: "500", color: "gray" }}>
                {testData.totalTime} min
              </Text>
            </View>

            {/* Download */}
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Ionicons name="cloud-download" size={20} color="gray" />
              <Text style={{ fontSize: 14, fontWeight: "500", color: "gray" }}>
                Guardar
              </Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "#718096",
              lineHeight: 22,
            }}
          >
            {testData.description}
          </Text>
        </View>

        {/* Ingredients */}
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 14,
            padding: 16,
            marginHorizontal: 20,
            gap: 12,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              color: "#2d3748",
            }}
          >
            Ingredientes
          </Text>

          <View style={{ flex: 1, flexDirection: "column", gap: 16 }}>
            {testData.ingredients.slice(0, 6).map((ingredient, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.primary,
                      borderRadius: "100%",
                      width: 8,
                      height: 8,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: "#2d3748",
                    }}
                  >
                    {ingredient.name}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "#2d3748",
                  }}
                >
                  {ingredient.amount} {ingredient.unit}
                </Text>
              </View>
            ))}
          </View>

          {testData.ingredients.length > 6 && (
            <>
              <View
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: "lightgray",
                }}
              />

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() =>
                    handlePresentModalPress(BottomSheetViews.INGREDIENTS)
                  }
                  style={{ width: "100%" }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: COLORS.primary,
                      textAlign: "center",
                    }}
                  >
                    Ver todos los ingredientes
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        {/* Steps */}
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 14,
            padding: 16,
            marginHorizontal: 20,
            gap: 12,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                color: "#2d3748",
              }}
            >
              Preparación
            </Text>
            {/* Read steps */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 16,
              }}
            >
              <Ionicons name="volume-high" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          {/* First 3 steps */}
          <View style={{ flex: 1, flexDirection: "column", gap: 16 }}>
            {testData.steps.slice(0, limitSteps).map((step, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.primary,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 100,
                      width: 35,
                      height: 35,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        color: COLORS.white,
                      }}
                    >
                      {step.number}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    {/* Duration */}
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#f3f4f6",
                        borderRadius: 16,
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "500",
                          color: "#718096",
                        }}
                      >
                        {step.duration} min
                      </Text>
                    </View>
                    {/* Play this step */}
                    <Ionicons name="play" size={20} color="#718096" />
                  </View>
                </View>

                {/* Description */}
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "#525d6d",
                    width: "100%",
                    paddingHorizontal: 5,
                  }}
                  numberOfLines={5}
                >
                  {step.text}
                </Text>

                {/* Divider */}
                {index < limitSteps - 1 && (
                  <View style={{ height: 1, backgroundColor: "lightgray" }} />
                )}
              </View>
            ))}
          </View>

          {testData.steps.length > limitSteps && (
            <>
              <View
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: "lightgray",
                }}
              />

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() =>
                    handlePresentModalPress(BottomSheetViews.STEPS)
                  }
                  style={{ width: "100%" }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: COLORS.primary,
                      textAlign: "center",
                    }}
                  >
                    Ver todos los pasos
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </Animated.ScrollView>

      {/* Modal */}
      {currentBsConfig && (
        <BottomSheetManager
          bottomSheetRef={bottomSheetRef}
          title={currentBsConfig.title}
          snapPoints={currentBsConfig.snapPoints}
        >
          {bottomSheetContent}
        </BottomSheetManager>
      )}
    </View>
  );
};

export default DetailsScreen;
