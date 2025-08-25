import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSegments } from "expo-router";
import COLORS from "../../constants/colors";

export default function SafeScreen({ children }) {
  const insets = useSafeAreaInsets();
  const notApplyInsets = ["details", "profile"];

  const segments = useSegments();

  const insetTop = () => {
    if (notApplyInsets.find((item) => segments.includes(item))) {
      return 0;
    }
    return insets.top;
  };

  return (
    <View style={[styles.container, { paddingTop: insetTop() }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
