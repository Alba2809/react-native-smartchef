import { View, Text, TouchableOpacity } from "react-native";
import styles from "../assets/styles/create.styles";

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
      style={
        categoriesSelected.includes(value._id)
          ? styles.categoryButtonSelected
          : styles.categoryButton
      }
    >
      <Text
        style={
          categoriesSelected.includes(value._id)
            ? styles.categoryTextSelected
            : styles.categoryText
        }
      >
        {value.name}
      </Text>
    </TouchableOpacity>
  ));

  return <View style={styles.categoryContainer}>{options}</View>;
}
