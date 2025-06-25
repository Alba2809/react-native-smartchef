import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import styles from "../assets/styles/create.styles";

export default function StepsList({ steps = [], handleRemoveStep }) {
  return (
    <>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          {/* Header */}
          <View style={styles.stepHeader}>
            <Text style={styles.stepNumberText}>Paso {index + 1}</Text>

            <View style={styles.stepRightDuration}>
              <Text style={styles.stepDurationText}>{step.duration} min</Text>

              <TouchableOpacity onPress={() => handleRemoveStep(index)}>
                <Ionicons
                  name="trash-outline"
                  size={25}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TextInput
            style={styles.textArea}
            multiline
            textAlignVertical="top"
            value={step.text}
            editable={false}
            scrollEnabled={true}
            selectTextOnFocus={false}
          />
        </View>
      ))}
    </>
  );
}
