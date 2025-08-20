import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Steps as StepsStyles, Form as FormStyles } from "../../assets/styles/create/create.styles";
import COLORS from "../../constants/colors";
import ExpandableText from "../common/ExpandableText";

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
            StepsStyles.stepContainer,
            {
              borderColor:
                expandedIndex === index ? COLORS.primary : COLORS.border,
            },
          ]}
        >
          {/* Header */}
          <View style={StepsStyles.stepHeader}>
            <Text style={StepsStyles.stepNumberText}>
              {handleNumberOfStep(index, step.number)}
            </Text>

            <View style={[StepsStyles.stepRightDuration, { gap: 12 }]}>
              <Text style={StepsStyles.stepDurationText}>{step.duration} min</Text>

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
                  <TouchableOpacity>
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
              container: [FormStyles.textAreaContainer, { paddingVertical: 5 }],
              text: FormStyles.textArea,
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
