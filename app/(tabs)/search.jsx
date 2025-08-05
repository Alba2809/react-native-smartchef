import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useCallback, useEffect } from "react";
import COLORS from "../../constants/colors";
import RecipeCard from "../../components/RecipeCard";
import useSearch from "../../hooks/useSearch";
import BottomSheetManager from "../../components/BottomSheetManager";
import useBottomSheet from "../../hooks/useBottomSheet";
import useFavoriteStore from "../../store/favoriteStore";

export default function search() {
  const {
    user,
    
    recipes,
    totalRecipes,
    flatListRef,
    
    filtersState,
    handleInputOnChange,
    handleCategory,
    
    applyFilters,
    fetchRecipes,
    handleLoadMore,
    loading,
    refreshing,
    hasMore,

    BottomSheetConfig,
    BottomSheetViews,
  } = useSearch();
  const { recipesFavorited } = useFavoriteStore();

  const {
    currentBsConfig,
    bottomSheetRef,
    bottomSheetContent,
    handlePresentModalPress,
  } = useBottomSheet({
    BottomSheetViews,
    BottomSheetConfig,
    dataProps: {
      applyFilters: () => {
        bottomSheetRef.current.close();
        applyFilters();
      },
      handleCategory,
      categories: filtersState.categories,
    },
  });

  useEffect(() => {
    fetchRecipes();
  }, []);

  const renderRecipeItem = useCallback(
    ({ item }) => (
      <RecipeCard
        item={item}
        localusername={user?.username}
        showHeart={recipesFavorited.includes(item._id) || item.isFavorite}
      />
    ),
    [recipesFavorited]
  );

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: COLORS.background,
        padding: 16,
        fontFamily: "JetBrainsMono-Medium",
        gap: 10,
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Search Header */}
      <View
        style={{
          flexDirection: "column",
          backgroundColor: COLORS.white,
          borderRadius: 14,
          padding: 8,
          gap: 14,

          shadowColor: COLORS.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
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
          <Ionicons name="search-outline" size={20} onPress={applyFilters} />
          <TextInput
            style={{
              fontSize: 14,
              fontFamily: "JetBrainsMono-Medium",
              color: "black",
              flex: 1,
            }}
            value={filtersState.title}
            onChangeText={handleInputOnChange("title")}
            onEndEditing={applyFilters}
            placeholder="Buscar receta..."
            placeholderTextColor="gray"
          />
          <TouchableOpacity
            style={{}}
            onPress={() => handlePresentModalPress(BottomSheetViews.FILTERS)}
          >
            <Ionicons name="filter-outline" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Results */}
      <View
        style={{
          flex: 1,
          borderRadius: 14,
        }}
      >
        {/* Title */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: COLORS.black,
            paddingHorizontal: 10,
          }}
        >
          Resultados de búsqueda
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
            color: COLORS.textSecondary,
            marginBottom: 10,
            paddingHorizontal: 10,
          }}
        >
          {totalRecipes} recetas encontradas
        </Text>

        {loading && (
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
            style={{
              alignSelf: "center",
            }}
          />
        )}

        {/* List */}
        <FlatList
          ref={flatListRef}
          data={recipes}
          renderItem={renderRecipeItem}
          style={{
            flex: 1,
            borderRadius: 14,
            paddingHorizontal: 10,
          }}
          keyExtractor={(item) => item._id.toString()}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchRecipes(1, true)}
              tintColor={COLORS.primary}
              colors={[COLORS.primary]}
            />
          }
          initialNumToRender={10}
          contentContainerStyle={{ gap: 20 }}
          onEndReached={/* () => {
            if (!loading && hasMore) {
              loadRecipes();
            }
          } */handleLoadMore}
          onEndReachedThreshold={0.1}
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
              No se han encontrado resultados...
            </Text>
          }
        />

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
