import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "JetBrainsMono-Medium",
    color: COLORS.textDark,
    marginBottom: 8,
    textAlign: "center",
  },
  scrollView: {
    paddingHorizontal: 20,
  }
});

export default styles;
