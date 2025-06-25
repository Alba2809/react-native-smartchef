import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../assets/styles/create.styles";
import COLORS from "../constants/colors";

export default function IngredientsList({
  ingredients = [],
  handleRemoveIngredient,
}) {
  return (
    <>
      {ingredients.map((ingredient, index) => (
        <View
          key={index}
          style={styles.ingredientListContainer}
        >
          <Text
            style={styles.ingredientListName}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {ingredient.name}
          </Text>

          <Text style={styles.amountUnitContainer}>
            {ingredient.amount + " " + ingredient.unit}
          </Text>

          <TouchableOpacity onPress={() => handleRemoveIngredient(index)}>
            <Ionicons name="trash-outline" size={25} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      ))}
    </>
  );
}
