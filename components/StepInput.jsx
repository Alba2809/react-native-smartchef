import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";
import {
  Steps as StepsStyles,
  Buttons as ButtonsStyles,
  Form as FormStyles,
} from "../assets/styles/create/create.styles";
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
    <View style={StepsStyles.stepContainer}>
      <View style={StepsStyles.stepHeader}>
        <Text style={StepsStyles.stepNumberText}>Paso {number}</Text>
        <View style={StepsStyles.stepRightDuration}>
          <View style={{ ...StepsStyles.stepDurationContainer, height: 40 }}>
            <BottomSheetTextInput
              style={{ ...FormStyles.input, height: 40 }}
              placeholderTextColor={COLORS.placeholderText}
              onChangeText={setDuration}
              placeholder="000000"
              keyboardType="numeric"
              value={duration}
              maxLength={4}
              textAlign="center"
            />
          </View>
          <Text style={StepsStyles.stepDurationText}>min</Text>
        </View>
      </View>
      <View style={FormStyles.textAreaContainer}>
        <BottomSheetTextInput
          style={FormStyles.textArea}
          placeholderTextColor={COLORS.placeholderText}
          placeholder="Describe tu preparación..."
          textAlignVertical="top"
          onChangeText={setText}
          value={text}
          multiline
        />
      </View>
      <TouchableOpacity
        onPress={saveStep}
        style={{ ...ButtonsStyles.button, marginTop: 5 }}
      >
        <Text style={ButtonsStyles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}
