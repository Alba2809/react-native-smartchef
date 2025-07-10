import { StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";

const styles = StyleSheet.create({
  stepContainer: {
    flexDirection: "column",
    gap: 8,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    marginBottom: 8,
  },
  stepHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.textPrimary,
  },
  stepRightDuration: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  stepDurationContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 8,
    width: 80,
    height: 48,
    justifyContent: "center",
  },
  stepDurationText: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default styles;
