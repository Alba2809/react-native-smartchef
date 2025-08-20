import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { useEffect } from "react";
import COLORS from "../../constants/colors";
import styles from "../../assets/styles/details.styles";
import BottomSheetManager from "../../components/common/BottomSheetManager";
import IngredientsList from "../../components/recipes/IngredientsList";
import StepsList from "../../components/recipes/StepsList";
import useBottomSheet from "../../hooks/useBottomSheet";
import useDetails from "../../hooks/useDetails";
import CategoriesList from "../../components/recipes/CategoriesList";
import useCategoryStore from "../../store/categoryStore";

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

const DetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { categories } = useCategoryStore();

  const {
    scrollY,
    backgroundColor,
    limitSteps,
    isTheOwner,

    recipe,
    getRecipe,
    loading,

    handleFavorite,
    loadingFavorite,

    uploadRecipe,
    sending,

    confirmDelete,
    deleting,
  } = useDetails({
    id,
  });

  const {
    handlePresentModalPress,
    bottomSheetRef,
    currentBsConfig,
    bottomSheetContent,
  } = useBottomSheet({
    BottomSheetViews,
    BottomSheetConfig,
    dataProps: {
      ingredients: recipe?.ingredients,
      steps: recipe?.steps,
    },
  });

  useEffect(() => {
    getRecipe();
  }, []);

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
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </Animated.View>

      {loading && !recipe ? (
        <>
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
            style={{
              alignSelf: "center",
            }}
          />
        </>
      ) : (
        <>
          {/* Imagen */}
          <Image
            source={{
              uri: recipe.image,
            }}
            style={styles.backgroundImage}
            contentFit="cover"
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
            style={[styles.scrollView, { paddingTop: insets.top + 56 }]}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            /* TODO: fix the refresh control */
            /* refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={refreshRecipe}
                tintColor={COLORS.primary}
                colors={[COLORS.primary]}
              />
            } */
          >
            {/* Basic info Card */}
            <View style={styles.basicInfoContainer}>
              <Text style={styles.title}>{recipe.title}</Text>

              {/* user info */}
              <View style={styles.userContainer}>
                <View style={styles.userInfo}>
                  <Image
                    source={{
                      uri: recipe.user.avatar,
                    }}
                    style={styles.userImage}
                  />
                  <View>
                    <Text style={styles.userNameFor}>por</Text>
                    <Text style={styles.userName}>
                      {recipe.user.username} {isTheOwner && "(tú)"}
                    </Text>
                  </View>
                </View>
                {/* Read the text */}
                <TouchableOpacity style={styles.btnPlayRecipe}>
                  <Ionicons
                    name="volume-high"
                    size={20}
                    color={COLORS.primary}
                  />
                  <Text style={styles.btnPlayRecipeText}>Reproducir</Text>
                </TouchableOpacity>
              </View>

              {/* Likes, time, download */}
              <View style={styles.interactionsContainer}>
                <TouchableOpacity
                  style={styles.btnLikes}
                  onPress={handleFavorite}
                  disabled={loadingFavorite || isTheOwner}
                >
                  <Ionicons
                    name={recipe.isFavorite ? "heart" : "heart-outline"}
                    size={20}
                    color={recipe.isFavorite ? "#ef4444" : "gray"}
                  />
                  <Text
                    style={[
                      styles.btnLikesText,
                      {
                        color: recipe.isFavorite ? COLORS.primary : "gray",
                      },
                    ]}
                  >
                    {recipe.favoriteCount || 0}
                  </Text>
                </TouchableOpacity>

                <View style={styles.timeContainer}>
                  <Ionicons name="time" size={20} color="gray" />
                  <Text style={styles.timeText}>{recipe.totalTime} min</Text>
                </View>

                {/* Download */}
                <TouchableOpacity style={styles.btnTimeContainer}>
                  <Ionicons name="cloud-download" size={20} color="gray" />
                  <Text style={styles.btnTimeText}>Guardar</Text>
                </TouchableOpacity>
              </View>

              {/* Description */}
              <Text style={styles.description}>{recipe.description}</Text>

              {/* Categories */}
              <CategoriesList
                recipeCategories={recipe.categories}
                categoriesArray={categories}
              />

              {/* Recipe manager (Delete, sahre) when the user is the owner */}
              {isTheOwner && (
                <>
                  {/* Divider */}
                  <View style={styles.divider} />

                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        paddingVertical: 6,
                        paddingHorizontal: 16,
                        borderRadius: 10,
                        backgroundColor: COLORS.primary,
                      }}
                      onPress={confirmDelete}
                      disabled={deleting}
                    >
                      {deleting ? (
                        <ActivityIndicator size="small" color="white" />
                      ) : (
                        <Ionicons name="trash-bin" size={20} color="white" />
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        paddingVertical: 6,
                        paddingHorizontal: 16,
                        borderRadius: 10,
                        backgroundColor: recipe.uploaded ? "lightgray" : COLORS.secondary,
                      }}
                      onPress={uploadRecipe}
                      disabled={sending || recipe.uploaded}
                    >
                      {sending ? (
                        <ActivityIndicator size="small" color="white" />
                      ) : (
                        <Ionicons
                          name="share-social-outline"
                          size={20}
                          color="white"
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>

            {/* Ingredients */}
            <View style={styles.itemsContainer}>
              <Text style={styles.title}>
                Ingredientes ({recipe.ingredients.length})
              </Text>

              <View style={styles.itemsList}>
                {!loading &&
                  recipe.ingredients.slice(0, 6).map((ingredient, index) => (
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

              {recipe.ingredients.length > 6 && (
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
                <Text style={styles.title}>
                  Preparación ({recipe.steps.length})
                </Text>
                {/* Read steps */}
                <TouchableOpacity style={styles.btnReadSteps}>
                  <Ionicons
                    name="volume-high"
                    size={20}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>

              {/* First 3 steps */}
              <View style={styles.itemsList}>
                {!loading &&
                  recipe.steps.slice(0, limitSteps).map((step, index) => (
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
                      {index < limitSteps - 1 &&
                        index !== recipe.steps.length - 1 && (
                          <View style={styles.divider} />
                        )}
                    </View>
                  ))}
              </View>

              {recipe.steps.length > limitSteps && (
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
        </>
      )}

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
