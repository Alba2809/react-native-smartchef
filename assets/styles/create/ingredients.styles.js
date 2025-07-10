import { StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";

const styles = StyleSheet.create({
  /* Register Ingredient */
  ingredientsContainer: {
    overflow: "hidden",
    flexDirection: "column",
    justifyContent: "space-between",
    maxHeight: 400,
    marginTop: 8,
  },
  ingredientInput: {
    height: 48,
    color: COLORS.textDark,
  },
  ingredientContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 8,
  },
  amountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
  /* Ingredient list */
  ingredientListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 10,
    alignItems: "center",
    marginBottom: 8,
  },
  ingredientListName: {
    fontSize: 15,
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: 0,
    marginRight: 10,
  },
  amountUnitContainer: {
    fontSize: 15,
    marginRight: 10,
  },
});

export default styles;
