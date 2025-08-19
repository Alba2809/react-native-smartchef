import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Ingredients as IngredientsStyles } from "../../assets/styles/create/create.styles";
import COLORS from "../../constants/colors";

export default function IngredientsList({
  ingredients = [],
  handleRemoveIngredient,
}) {
  return (
    <>
      {ingredients.map((ingredient, index) => (
        <View key={index} style={IngredientsStyles.ingredientListContainer}>
          <Text
            style={IngredientsStyles.ingredientListName}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {ingredient.name}
          </Text>

          <Text style={IngredientsStyles.amountUnitContainer}>
            {ingredient.amount + " " + ingredient.unit}
          </Text>

          {handleRemoveIngredient && (
            <TouchableOpacity onPress={() => handleRemoveIngredient(index)}>
              <Ionicons name="trash-outline" size={25} color={COLORS.primary} />
            </TouchableOpacity>
          )}
        </View>
      ))}
      {ingredients.length === 0 && (
        <Text style={{ fontSize: 15, color: COLORS.textSecondary }}>
          No se han registrado ingredientes...
        </Text>
      )}
    </>
  );
}
