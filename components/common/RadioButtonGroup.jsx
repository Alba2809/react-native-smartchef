import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import COLORS from "../../constants/colors";

/* options structure: */
/* 
  {
    value: T;
    content: React.ReactNode;
  }[]
*/

export default function RadioButtonGroup({ options, selectedValue, onChange }) {
  return (
    <View style={styles.optionsContainer}>
      {options.map(({ value, content }, index) => {
        const isSelected = selectedValue === value;

        return (
          <TouchableOpacity
            key={index}
            onPress={() => onChange(value)}
            style={styles.optionContainer}
          >
            <View style={styles.radioCircle}>
              {isSelected && <View style={styles.selectedRb} />}
            </View>
            <View style={styles.contentContainer}>{content}</View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection: "column",
    gap: 15,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#4e4e4e",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  contentContainer: {
    flex: 1,
  },
});
