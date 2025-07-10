import { StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";

const shadow = {
  shadowColor: COLORS.black,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
};

const baseButton = {
  backgroundColor: COLORS.primary,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
};

export default StyleSheet.create({
  button: {
    borderRadius: 12,
    height: 50,
    marginTop: 16,
    ...baseButton,
    ...shadow,
  },
  buttonSecondary: {
    borderRadius: 8,
    height: 40,
    ...baseButton,
    ...shadow,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonAI: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    height: 38,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 10,
    gap: 5,
    ...shadow,
  },
  buttonTextAI: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "500",
  },
  buttonSubmit: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    paddingVertical: 10,
    ...shadow,
  },
  buttonTextSubmit: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  buttonPreview: {
    backgroundColor: "transparent",
    borderColor: COLORS.primary,
    borderRadius: 12,
    borderWidth: 2,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    paddingVertical: 10,
  },
  buttonTextPreview: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  /* Radio button */
  textContainerRadio: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  titleRadio: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: "600",
  },
  subtitleRadio: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "left",
    fontWeight: "500",
  },
});
