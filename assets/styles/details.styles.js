import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },

  /* Header */
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 4,

    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100%",
    width: 40,
    height: 40,
    padding: 8,
  },

  /* Background */
  backgroundImage: {
    width: "100%",
    height: 250,
    zIndex: 1,
    position: "absolute",
    top: 0,
  },
  backgroundFade: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    zIndex: 2,
  },

  scrollView: {
    flex: 1,
    zIndex: 3,
    position: "relative",
  },

  /* Basic info Card */
  basicInfoContainer: {
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 20,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2d3748",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  userImage: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: 100,
    borderColor: COLORS.border,
    borderWidth: 1,
  },
  userNameFor: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2d3748",
  },
  userName: {
    fontSize: 14,
    fontWeight: "600",
  },
  btnPlayRecipe: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff2ed",
    borderRadius: 16,
  },
  btnPlayRecipeText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.primary,
  },
  interactionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 8,
  },
  btnLikes: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  btnLikesText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "gray",
  },
  btnTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  btnTimeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "gray",
  },
  description: {
    fontSize: 16,
    fontWeight: "500",
    color: "#718096",
    lineHeight: 22,
    minHeight: 50,
  },

  /* Ingredients and steps */
  itemsContainer: {
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 20,
    gap: 12,
  },
  itemsList: {
    flex: 1,
    flexDirection: "column",
    gap: 16,
  },
  ingredientsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ingredientName: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  ingredientNameCircle: {
    backgroundColor: COLORS.primary,
    borderRadius: "100%",
    width: 8,
    height: 8,
  },
  ingredientNameText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2d3748",
  },
  ingredientAmount: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2d3748",
  },
  // steps
  stepsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btnReadSteps: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  stepItem: {
    flexDirection: "column",
    gap: 10,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  stepNumberContainer: {
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    width: 35,
    height: 35,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.white,
  },
  stepDurationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  stepDuration: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  stepDurationText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#718096",
  },
  stepDescription: {
    fontSize: 14,
    fontWeight: "500",
    color: "#525d6d",
    width: "100%",
    paddingHorizontal: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "lightgray",
  },

  /* Show more */
  showMoreContainer: {
    width: "100%",
    height: 1,
    backgroundColor: "lightgray",
  },
  showMoreBackground: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnShowMore: {
    width: "100%",
  },
  btnShowMoreText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.primary,
    textAlign: "center",
  },
});

export default styles;
