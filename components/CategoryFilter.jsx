import { View, Text, TouchableOpacity } from "react-native";
import CategoryPicker from "./CategoryPicker";
import COLORS from "../constants/colors";

const CategoryFilter = ({
  handleCategory,
  categoriesSelected,
  applyFilters,
}) => {
  return (
    <View>
      <CategoryPicker
        handleCategory={handleCategory}
        categoriesSelected={categoriesSelected}
      />
      <TouchableOpacity
        onPress={applyFilters}
        style={{
          backgroundColor: COLORS.primary,
          borderRadius: 12,
          height: 50,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 16,
          paddingVertical: 10,

          shadowColor: COLORS.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          Filtrar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryFilter;
