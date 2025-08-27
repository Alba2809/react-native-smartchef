import { useState } from "react";
import { View, TouchableOpacity, Text, ToastAndroid } from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import {
  Ingredients as IngredientsStyles,
  Buttons as ButtonsStyles,
  Form as FormStyles,
} from "../../assets/styles/create/create.styles";
import { units } from "../../utils/ingredients";
import DropDownPicker from "react-native-dropdown-picker";
import COLORS from "../../constants/colors";
import Toast from "react-native-toast-message";

export default function IngredientInput({ handleAddIngredient }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [unit, setUnit] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(units);

  const saveIngredient = () => {
    /* Validate inputs */
    if (!name || !amount || !unit || amount <= 0 || name.trim() === "") {
      Toast.show({
        type: "error",
        text1: "Información incompleta",
        position: "top",
        text1Style: { fontSize: 14 },
      });
      return;
    }

    /* Add ingredient */
    handleAddIngredient({ name: name.trim(), amount: amount, unit });

    /* Reset inputs */
    setName("");
    setAmount(0);
    setUnit(null);
  };

  return (
    <View style={IngredientsStyles.ingredientContainer}>
      <View style={FormStyles.inputContainer}>
        <BottomSheetTextInput
          style={FormStyles.input}
          placeholder="Nombre"
          placeholderTextColor={COLORS.placeholderText}
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={IngredientsStyles.amountContainer}>
        <View
          style={{
            ...FormStyles.inputContainer,
            maxWidth: 90,
            width: "100%",
          }}
        >
          <BottomSheetTextInput
            style={IngredientsStyles.ingredientInput}
            placeholder="Cantidad"
            placeholderTextColor={COLORS.placeholderText}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            maxLength={4}
          />
        </View>
        <View style={{ flex: 1 }}>
          <DropDownPicker
            open={open}
            setOpen={setOpen}
            items={items}
            setItems={setItems}
            value={unit}
            setValue={setUnit}
            placeholder="Unidad"
            listMode="MODAL"
            style={FormStyles.dropdown}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={saveIngredient}
        style={{ ...ButtonsStyles.button, marginTop: 0 }}
      >
        <Text style={ButtonsStyles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}
