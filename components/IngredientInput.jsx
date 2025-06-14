import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import styles from "../assets/styles/create.styles";
import COLORS from "../constants/colors";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";

export default function IngredientInput({ ingredients, setIngredients }) {
  const [items, setItems] = useState([
    { label: "Gramos", value: "gr" },
    { label: "Litros", value: "ltr" },
    { label: "Piezas", value: "piezas" },
  ]);

  const updateIngredient = (index, field, value) => {
    const newIngredients = [...ingredients];
    const newValue = field === "amount" ? parseFloat(value) : value;
    newIngredients[index][field] = newValue;

    setIngredients(newIngredients);
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);

    setIngredients(newIngredients);
  };

  return (
    <View style={styles.ingredientsContainer}>
      {ingredients.map((ingredient, index) => (
        <View key={index} style={styles.ingredientContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              placeholderTextColor={COLORS.placeholderText}
              value={ingredient.name}
              onChangeText={(text) => updateIngredient(index, "name", text)}
            />
          </View>
          <View style={styles.amountContainer}>
            <View style={{...styles.inputContainer, maxWidth: 90, width: "100%"}}>
              <TextInput
                style={styles.ingredientInput}
                placeholder="Cantidad"
                placeholderTextColor={COLORS.placeholderText}
                value={ingredient.amount}
                onChangeText={(text) => updateIngredient(index, "amount", text)}
                keyboardType="numeric"
                maxLength={4}
              />
            </View>
            <View style={{ flex: 1 }}>
              <DropDownPicker
                open={ingredient.open}
                setOpen={(open) => {
                  const updated = [...ingredients];

                  //close all other dropdowns
                  ingredients.forEach((ingredient) => {
                    ingredient.open = false;
                  });

                  updated[index].open = open;

                  setIngredients(updated);
                }}
                items={items}
                value={ingredient.unit}
                setValue={(cb) => {
                  updateIngredient(index, "unit", cb(ingredient.unit));
                }}
                setItems={setItems}
                placeholder="Unidad"
                listMode="MODAL"
                onClose={() => {
                  const updated = [...ingredients];
                  updated[index].open = false;
                  setIngredients(updated);
                }}
                style={styles.dropdown}
              />
            </View>
            <TouchableOpacity
              onPress={() => removeIngredient(index)}
            >
              <Ionicons name="trash-outline" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
}
