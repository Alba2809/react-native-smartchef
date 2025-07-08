import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import styles from "../assets/styles/create.styles";
import ExpandableText from "./ExpandableText";
import { useState } from "react";

export default function StepsList({ steps = [], handleRemoveStep, playStep = false }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const onToggle = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const handleNumberOfStep = (index, stepNumber) => {
    return stepNumber || index + 1;
  };

  return (
    <>
      {steps.map((step, index) => (
        <View
          key={index}
          style={[
            styles.stepContainer,
            {
              borderColor:
                expandedIndex === index ? COLORS.primary : COLORS.border,
            },
          ]}
        >
          {/* Header */}
          <View style={styles.stepHeader}>
            <Text style={styles.stepNumberText}>
              {handleNumberOfStep(index, step.number)}
            </Text>

            <View style={[styles.stepRightDuration, { gap: 12 }]}>
              <Text style={styles.stepDurationText}>{step.duration} min</Text>

              {handleRemoveStep && (
                <TouchableOpacity onPress={() => handleRemoveStep(index)}>
                  <Ionicons
                    name="trash-outline"
                    size={25}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              )}

              {
                playStep && (
                  <TouchableOpacity onPress={() => console.log("play step " + index)}>
                    <Ionicons
                      name="play"
                      size={20}
                      color="#718096"
                    />
                  </TouchableOpacity>
                )
              }
            </View>
          </View>

          <ExpandableText
            text={step.text}
            lines={5}
            onToggle={() => onToggle(index)}
            isExpanded={expandedIndex === index}
            styles={{
              container: styles.textAreaContainer,
              text: styles.textArea,
            }}
          />
        </View>
      ))}
      {steps.length === 0 && (
        <Text style={{ fontSize: 15, color: COLORS.textSecondary }}>
          No se han registrado pasos de preparación...
        </Text>
      )}
    </>
  );
}
