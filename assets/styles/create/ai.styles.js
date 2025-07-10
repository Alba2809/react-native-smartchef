import { StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";

const styles = StyleSheet.create({
  containerAI: {
    flexGrow: 1,
    borderRadius: 16,
    padding: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  textContainerAI: {
    fontSize: 15,
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: 0,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  titleAI: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: "600",
  },
  subtitleAI: {
    fontSize: 14,
    color: COLORS.white,
    textAlign: "left",
  },
});

export default styles;