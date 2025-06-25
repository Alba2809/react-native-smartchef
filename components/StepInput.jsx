import { useState } from "react";
import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";
import styles from "../assets/styles/create.styles";
import COLORS from "../constants/colors";

export default function StepInput({ handleAddStep, totalSteps }) {
  const [text, setText] = useState("");
  const [duration, setDuration] = useState(0);
  const [number, setNumber] = useState(totalSteps + 1);

  const saveStep = () => {
    /* Validate inputs */
    if (!text || !duration || !number) {
      Toast.show({
        type: "error",
        text1: "Información incompleta",
        position: "top",
      });
      return;
    }

    if (text.trim() === "" || duration < 0 || number === null) {
      Toast.show({
        type: "error",
        text1: "Información incompleta",
        position: "top",
      });
      return;
    }

    /* Add step */
    handleAddStep({ text, duration, number });

    /* Reset inputs */
    setText("");
    setDuration(0);
    setNumber((prev) => prev + 1);
  };

  return (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepNumberText}>
          Paso {number}
        </Text>
        <View style={styles.stepRightDuration}>
          <View style={{...styles.stepDurationContainer, height: 40}}> 
            <BottomSheetTextInput
              style={{...styles.input, height: 40}}
              placeholderTextColor={COLORS.placeholderText}
              onChangeText={setDuration}
              placeholder="000000"
              keyboardType="numeric"
              value={duration}
              maxLength={4}
              textAlign="center"
            />
          </View>
          <Text style={styles.stepDurationText}>min</Text>
        </View>
      </View>
      <BottomSheetTextInput
        style={styles.textArea}
        placeholderTextColor={COLORS.placeholderText}
        placeholder="Describe tu preparación..."
        textAlignVertical="top"
        onChangeText={setText}
        value={text}
        multiline
      />
      <TouchableOpacity
        onPress={saveStep}
        style={{ ...styles.button, marginTop: 5 }}
      >
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}
