import { View, Text, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../constants/colors";

export default function LoadingPage() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={"#fff"} />
      </LinearGradient>
    </View>
  );
}
