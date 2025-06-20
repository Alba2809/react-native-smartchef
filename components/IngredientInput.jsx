import { useState } from "react";
import { View, TouchableOpacity, Text, ToastAndroid } from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import styles from "../assets/styles/create.styles";
import DropDownPicker from "react-native-dropdown-picker";
import COLORS from "../constants/colors";

export default function IngredientInput({ handleAddIngredient }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [unit, setUnit] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Gramos", value: "gr" },
    { label: "Litros", value: "ltr" },
    { label: "Piezas", value: "piezas" },
  ]);

  const saveIngredient = () => {
    /* Validate inputs */
    if (!name || !amount || !unit) {
      ToastAndroid.showWithGravity(
        "Información incompleta", 
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }

    if (name.trim() === "" || amount <= 0 || unit === null) {
      ToastAndroid.showWithGravity(
        "Información incompleta", 
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }

    /* Add ingredient */
    handleAddIngredient({ name, amount, unit });

    /* Reset inputs */
    setName("");
    setAmount(0);
    setUnit(null);
  };

  return (
    <View style={styles.ingredientContainer}>
      <View style={styles.inputContainer}>
        <BottomSheetTextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor={COLORS.placeholderText}
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.amountContainer}>
        <View style={{ ...styles.inputContainer, maxWidth: 90, width: "100%" }}>
          <BottomSheetTextInput
            style={styles.ingredientInput}
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
            style={styles.dropdown}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={saveIngredient}
        style={{ ...styles.button, marginTop: 0 }}
      >
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}
