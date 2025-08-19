import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { useSegments } from "expo-router";

export default function SafeScreen({ children }) {
  const insets = useSafeAreaInsets();
  const notApplyInsets = ["details"];

  const segment = useSegments()[0];

  const insetTop = () => {
    if (notApplyInsets.includes(segment)) return 0;
    return insets.top;
  }

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
