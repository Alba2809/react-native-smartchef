import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../assets/styles/create.styles";
import COLORS from "../constants/colors";

export default function IngredientsList({
  ingredients,
  handleRemoveIngredient,
}) {
  return (
    <>
      {ingredients.map((ingredient, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: COLORS.inputBackground,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: COLORS.border,
            padding: 10,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              flexShrink: 1,
              flexGrow: 1,
              flexBasis: 0,
              marginRight: 10,
            }}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {ingredient.name}
          </Text>

          <Text style={{ fontSize: 15, marginRight: 10 }}>
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
