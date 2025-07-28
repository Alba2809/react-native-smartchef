import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { useEffect } from "react";
import useCategoryStore from "../../store/categoryStore";
import styles from "../../assets/styles/home.styles";
import COLORS from "../../constants/colors";
import useHome from "../../hooks/useHome";
import RecipeCard from "../../components/RecipeCard";
import BottomSheetManager from "../../components/BottomSheetManager";
import useBottomSheet from "../../hooks/useBottomSheet";

export default function index() {
  const {
    user,
    token,
    flatListRef,

    baseFilter,
    FILTER_OPTIONS,
    filtersState,
    setBaseFilter,
    handleCategory,
    handleInputOnChange,
    applyFilters,

    allRecipes,
    getFavorites,
    getRecipesSaved,

    BottomSheetViews,
    BottomSheetConfig,
  } = useHome();

  const {
    currentBsConfig,
    bottomSheetRef,
    bottomSheetContent,
    handlePresentModalPress,
  } = useBottomSheet({
    BottomSheetViews,
    BottomSheetConfig,
    dataProps: {
      handleCategory,
      categories: filtersState.categories,
      applyFilters: () => {
        bottomSheetRef.current.close();
        applyFilters();
      },
    },
  });

  /* useEffect(() => {
    if (allRecipes.length > 0 && flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }, [allRecipes]); */

  useEffect(() => {
    Promise.all([
      getFavorites({
        token,
        title: filtersState.title,
        categories: filtersState.categories,
      }),
      getRecipesSaved({
        title: filtersState.title,
        categories: filtersState.categories,
      }),
    ]);
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        {/* Header */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
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
            <Image source={user.avatar} style={styles.headerUserIcon} />
          </View>
        </LinearGradient>

        {/* Search bar with filter and tags */}
        <View style={styles.filterContainer}>
          {/* Search bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} onPress={applyFilters} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar receta..."
              value={filtersState.title}
              onChangeText={handleInputOnChange("title")}
              placeholderTextColor={COLORS.placeholderText}
              onEndEditing={applyFilters}
            />
            <TouchableOpacity
              style={{}}
              onPress={() => handlePresentModalPress(BottomSheetViews.FILTERS)}
            >
              <Ionicons name="filter-outline" size={20} />
            </TouchableOpacity>
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

        {/* Empty list */}
        {/* {allRecipes.length === 0 && (
          <View style={{}}>
            <Text
              style={{
                fontSize: 14,
                color: COLORS.textDark,
              }}
            >
              Aún no tienes ninguna receta guardada...
            </Text>
          </View>
        )} */}

        {/* Recipes list */}
        {/* TODO: fix the keyExtractor, to use the item._id */}
        <Animated.FlatList
          ref={flatListRef}
          data={allRecipes}
          renderItem={({ item }) => <RecipeCard item={item} user={user} />}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          style={{ flex: 1, borderRadius: 14, paddingBottom: 10 }}
          contentContainerStyle={{ gap: 20 }}
          ListEmptyComponent={
            <View style={{}}>
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.textDark,
                }}
              >
                Aún no tienes ninguna receta guardada...
              </Text>
            </View>
          }
        />

        {/* Bottom sheet manager */}
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
    </KeyboardAvoidingView>
  );
}
