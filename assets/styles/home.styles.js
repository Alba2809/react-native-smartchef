import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
    gap: 10,
    fontFamily: "JetBrainsMono-Medium",
  },

  /* Header */
  linearGradient: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderRadius: 14,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  headerLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerIconApp: {
    width: 45,
    height: 45,
  },
  headerTextContainer: {
    flexDirection: "column",
    alignSelf: "flex-start",
  },
  headerAppName: {
    fontSize: 18,
    
    fontWeight: "bold",
    color: COLORS.white,
  },
  headerGreeting: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  headerUserContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  headerUserIcon: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: 100,
  },

  /* Search bar with filter and tags */
  filterContainer: {
    flexDirection: "column",
    padding: 8,
    gap: 14,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.inputBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 8,
  },
  searchInput: {
    fontSize: 14,
    color: COLORS.textDark,
    flex: 1,
  },
  tagsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  tagButton: {
    borderRadius: 14,
    flex: 1,
    paddingVertical: 6,
  },
  tagText: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default styles;
