import { useMemo } from "react";
import { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const CategoriesList = memo(
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
});

export default CategoriesList;
