import { View, Text, TouchableOpacity } from "react-native";
import COLORS from "../constants/colors";

export default function CategoryPicker({ handleCategory, categoriesSelected }) {
  const catArray = [
    {
      _id: 1,
      name: "Desayuno",
    },
    {
      _id: 2,
      name: "Comida",
    },
    {
      _id: 3,
      name: "Postre",
    },
    {
      _id: 4,
      name: "Pantry",
    },
    {
      _id: 5,
      name: "Comida rápida",
    },
    {
      _id: 6,
      name: "Bebida",
    },
  ];

  const options = catArray.map((value) => (
    <TouchableOpacity
      key={value._id}
      onPress={() => handleCategory(value._id)}
      style={{
        backgroundColor: COLORS.inputBackground,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 8,
        borderColor: categoriesSelected.includes(value._id)
          ? COLORS.primary
          : COLORS.border,
      }}
    >
      <Text
        style={{
          color: categoriesSelected.includes(value._id)
            ? COLORS.primary
            : COLORS.textDark,
        }}
      >
        {value.name}
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
