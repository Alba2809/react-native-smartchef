import { View, Text, TouchableOpacity } from "react-native";
import useCategoryStore from "../store/categoryStore";
import COLORS from "../constants/colors";

export default function CategoryPicker({ handleCategory, categoriesSelected }) {
  const { categories } = useCategoryStore();

  const capitalize = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const options = categories.map((value) => (
    <TouchableOpacity
      key={value._id}
      onPress={() => handleCategory(value._id)}
      style={{
        backgroundColor: COLORS.inputBackground,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 8,
        borderColor: categoriesSelected?.includes(value._id)
          ? COLORS.primary
          : COLORS.border,
      }}
    >
      <Text
        style={{
          color: categoriesSelected?.includes(value._id)
            ? COLORS.primary
            : COLORS.textDark,
        }}
      >
        {capitalize(value.name)}
      </Text>
    </TouchableOpacity>
  ));

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 8,
      }}
    >
      {options}
    </View>
  );
}
