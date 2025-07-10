import { StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";

const baseContainer = {
  backgroundColor: COLORS.white,
  borderColor: COLORS.border,
  paddingHorizontal: 12,
  borderRadius: 12,
  borderWidth: 1,
};

const styles = StyleSheet.create({
  formGroup: {
    flexDirection: "column",
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    ...baseContainer,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 48,
    color: COLORS.textDark,
  },
  textAreaContainer: {
    ...baseContainer,
    height: "auto",
    minHeight: 48,
  },
  textArea: {
    fontSize: 15,
    lineHeight: 20,
    color: "#525d6d",
  },
  dropdown: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    color: COLORS.textDark,
  },
});

export default styles;
