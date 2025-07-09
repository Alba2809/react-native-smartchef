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
import { useRef } from "react";
import styles from "../../assets/styles/details.styles";
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
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom + 5,
        },
      ]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <Animated.View
        style={[
          styles.headerContainer,
          { backgroundColor: backgroundColor, paddingTop: insets.top + 8 },
        ]}
      >
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back" size={24} color={"black"} />
        </TouchableOpacity>
      </Animated.View>

      {/* Imagen */}
      <Image
        source={testData.image}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <LinearGradient
        colors={["transparent", "#f2f2f2"]}
        locations={[0, 0.15]}
        style={styles.backgroundFade}
        pointerEvents="none"
      />

      <Animated.ScrollView
        contentContainerStyle={{
          gap: 20,
        }}
        style={[styles.scrollView, { marginTop: insets.top + 56 }]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Basic info Card */}
        <View style={styles.basicInfoContainer}>
          <Text style={styles.title}>{testData.title}</Text>

          {/* user info */}
          <View style={styles.userContainer}>
            <View style={styles.userInfo}>
              <Image
                source={require("../../assets/images/icon.png")}
                style={styles.userImage}
              />
              <View>
                <Text style={styles.userNameFor}>por</Text>
                <Text style={styles.userName}>{testData.user.username}</Text>
              </View>
            </View>
            {/* Read the text */}
            <TouchableOpacity style={styles.btnPlayRecipe}>
              <Ionicons name="volume-high" size={20} color={COLORS.primary} />
              <Text style={styles.btnPlayRecipeText}>Reproducir</Text>
            </TouchableOpacity>
          </View>

          {/* Likes, time, download */}
          <View style={styles.interactionsContainer}>
            <TouchableOpacity style={styles.btnLikes}>
              <Ionicons name="heart" size={20} color="#ef4444" />
              <Text style={styles.btnLikesText}>{testData.likes}</Text>
            </TouchableOpacity>

            <View style={styles.timeContainer}>
              <Ionicons name="time" size={20} color="gray" />
              <Text style={styles.timeText}>{testData.totalTime} min</Text>
            </View>

            {/* Download */}
            <TouchableOpacity style={styles.btnTimeContainer}>
              <Ionicons name="cloud-download" size={20} color="gray" />
              <Text style={styles.btnTimeText}>Guardar</Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <Text style={styles.description}>{testData.description}</Text>
        </View>

        {/* Ingredients */}
        <View style={styles.itemsContainer}>
          <Text style={styles.title}>Ingredientes</Text>

          <View style={styles.itemsList}>
            {testData.ingredients.slice(0, 6).map((ingredient, index) => (
              <View key={index} style={styles.ingredientsContainer}>
                <View style={styles.ingredientName}>
                  <View style={styles.ingredientNameCircle} />
                  <Text style={styles.ingredientNameText}>
                    {ingredient.name}
                  </Text>
                </View>
                <Text style={styles.ingredientAmount}>
                  {ingredient.amount} {ingredient.unit}
                </Text>
              </View>
            ))}
          </View>

          {testData.ingredients.length > 6 && (
            <>
              <View style={styles.showMoreContainer} />

              <View style={styles.showMoreBackground}>
                <TouchableOpacity
                  onPress={() =>
                    handlePresentModalPress(BottomSheetViews.INGREDIENTS)
                  }
                  style={styles.btnShowMore}
                >
                  <Text style={styles.btnShowMoreText}>
                    Ver todos los ingredientes
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        {/* Steps */}
        <View style={styles.itemsContainer}>
          <View style={styles.stepsHeader}>
            <Text style={styles.title}>Preparación</Text>
            {/* Read steps */}
            <TouchableOpacity style={styles.btnReadSteps}>
              <Ionicons name="volume-high" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          {/* First 3 steps */}
          <View style={styles.itemsList}>
            {testData.steps.slice(0, limitSteps).map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View style={styles.stepContainer}>
                  <View style={styles.stepNumberContainer}>
                    <Text style={styles.stepNumber}>{step.number}</Text>
                  </View>
                  <View style={styles.stepDurationContainer}>
                    {/* Duration */}
                    <View style={styles.stepDuration}>
                      <Text style={styles.stepDurationText}>
                        {step.duration} min
                      </Text>
                    </View>
                    {/* Play this step */}
                    <Ionicons name="play" size={20} color="#718096" />
                  </View>
                </View>

                {/* Description */}
                <Text style={styles.stepDescription} numberOfLines={5}>
                  {step.text}
                </Text>

                {/* Divider */}
                {index < limitSteps - 1 && <View style={styles.stepDivider} />}
              </View>
            ))}
          </View>

          {testData.steps.length > limitSteps && (
            <>
              <View style={styles.showMoreContainer} />

              <View style={styles.showMoreBackground}>
                <TouchableOpacity
                  onPress={() =>
                    handlePresentModalPress(BottomSheetViews.STEPS)
                  }
                  style={styles.btnShowMore}
                >
                  <Text style={styles.btnShowMoreText}>
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
