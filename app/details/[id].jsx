import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import COLORS from "../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { useRef } from "react";

const DetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const scrollY = useRef(new Animated.Value(0)).current;

  const backgroundColor = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ["transparent", "white"],
    extrapolate: "clamp",
  });

  const testData = {
    title: "Pasta Casbonara Clásica",
    description:
      "Una receta de pan con tomate, una receta de pan con tomate una receta de pan con tomate una receta de pan con tomate una receta de pan con tomate",
    image: require("../../assets/images/pasta.jpeg"),
    totalTime: 10,
    ingredients: ["Tomate", "Agua"],
    steps: ["Paso 1", "Paso 2", "Paso 3"],
    categories: ["Entrantes", "Recetas de cocina"],
    user: {
      username: "John Doe",
    },
    likes: 10,
  };

  const goBack = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, flexDirection: "column", paddingBottom: insets.bottom }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <Animated.View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 3,

          backgroundColor: backgroundColor,
          paddingHorizontal: 8,
          paddingTop: insets.top + 8,
          paddingBottom: 8,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "100%",
            width: 40,
            height: 40,
            padding: 8,
          }}
          onPress={goBack}
        >
          <Ionicons name="arrow-back" size={24} color={"black"} />
        </TouchableOpacity>
      </Animated.View>

      {/* Imagen */}
      <Image
        source={testData.image}
        style={{
          width: "100%",
          height: 250,
          zIndex: 1,
          position: "absolute",
          top: 0,
        }}
        resizeMode="cover"
      />

      <LinearGradient
        colors={["transparent", "#f2f2f2"]}
        locations={[0, 0.15]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100%",
          zIndex: 2,
        }}
        pointerEvents="none"
      />

      <Animated.ScrollView
        contentContainerStyle={{
          gap: 20,
        }}
        style={{
          flex: 1,
          marginTop: insets.top + 56,
          zIndex: 3,
          position: "relative",
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Basic info Card */}
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 14,
            padding: 16,
            marginHorizontal: 20,
            gap: 12,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              color: "#2d3748",
            }}
          >
            {testData.title}
          </Text>

          {/* user info */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Image
                source={require("../../assets/images/icon.png")}
                style={{ width: 35, height: 35 }}
              />
              <View style={{}}>
                <Text
                  style={{ fontSize: 14, fontWeight: "500", color: "#2d3748" }}
                >
                  por
                </Text>
                <Text style={{ fontSize: 14, fontWeight: "600" }}>
                  {testData.user.username}
                </Text>
              </View>
            </View>
            {/* Read the text */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                paddingVertical: 8,
                paddingHorizontal: 12,
                backgroundColor: "#fff2ed",
                borderRadius: 16,
              }}
            >
              <Ionicons name="volume-high" size={20} color={COLORS.primary} />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: COLORS.primary,
                }}
              >
                Reproducir
              </Text>
            </TouchableOpacity>
          </View>

          {/* Likes */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              gap: 8,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Ionicons name="heart" size={20} color="#ef4444" />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: COLORS.primary,
                }}
              >
                {testData.likes}
              </Text>
            </TouchableOpacity>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Ionicons name="time" size={20} color="gray" />
              <Text style={{ fontSize: 14, fontWeight: "500", color: "gray" }}>
                {testData.totalTime} min
              </Text>
            </View>

            {/* Download */}
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Ionicons name="cloud-download" size={20} color="gray" />
              <Text style={{ fontSize: 14, fontWeight: "500", color: "gray" }}>
                Guardar
              </Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "#718096",
              lineHeight: 22,
            }}
          >
            {testData.description}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 14,
            padding: 16,
            marginHorizontal: 20,
            gap: 12,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              color: "#2d3748",
            }}
          >
            {testData.title}
          </Text>

          {/* user info */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Image
                source={require("../../assets/images/icon.png")}
                style={{ width: 35, height: 35 }}
              />
              <View style={{}}>
                <Text
                  style={{ fontSize: 14, fontWeight: "500", color: "#2d3748" }}
                >
                  por
                </Text>
                <Text style={{ fontSize: 14, fontWeight: "600" }}>
                  {testData.user.username}
                </Text>
              </View>
            </View>
            {/* Read the text */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                paddingVertical: 8,
                paddingHorizontal: 12,
                backgroundColor: "#fff2ed",
                borderRadius: 16,
              }}
            >
              <Ionicons name="volume-high" size={20} color={COLORS.primary} />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: COLORS.primary,
                }}
              >
                Reproducir
              </Text>
            </TouchableOpacity>
          </View>

          {/* Likes */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              gap: 8,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Ionicons name="heart" size={20} color="#ef4444" />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: COLORS.primary,
                }}
              >
                {testData.likes}
              </Text>
            </TouchableOpacity>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Ionicons name="time" size={20} color="gray" />
              <Text style={{ fontSize: 14, fontWeight: "500", color: "gray" }}>
                {testData.totalTime} min
              </Text>
            </View>

            {/* Download */}
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Ionicons name="cloud-download" size={20} color="gray" />
              <Text style={{ fontSize: 14, fontWeight: "500", color: "gray" }}>
                Guardar
              </Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "#718096",
              lineHeight: 22,
            }}
          >
            {testData.description}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 14,
            padding: 16,
            marginHorizontal: 20,
            gap: 12,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              color: "#2d3748",
            }}
          >
            {testData.title}
          </Text>

          {/* user info */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Image
                source={require("../../assets/images/icon.png")}
                style={{ width: 35, height: 35 }}
              />
              <View style={{}}>
                <Text
                  style={{ fontSize: 14, fontWeight: "500", color: "#2d3748" }}
                >
                  por
                </Text>
                <Text style={{ fontSize: 14, fontWeight: "600" }}>
                  {testData.user.username}
                </Text>
              </View>
            </View>
            {/* Read the text */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                paddingVertical: 8,
                paddingHorizontal: 12,
                backgroundColor: "#fff2ed",
                borderRadius: 16,
              }}
            >
              <Ionicons name="volume-high" size={20} color={COLORS.primary} />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: COLORS.primary,
                }}
              >
                Reproducir
              </Text>
            </TouchableOpacity>
          </View>

          {/* Likes */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              gap: 8,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Ionicons name="heart" size={20} color="#ef4444" />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: COLORS.primary,
                }}
              >
                {testData.likes}
              </Text>
            </TouchableOpacity>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Ionicons name="time" size={20} color="gray" />
              <Text style={{ fontSize: 14, fontWeight: "500", color: "gray" }}>
                {testData.totalTime} min
              </Text>
            </View>

            {/* Download */}
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Ionicons name="cloud-download" size={20} color="gray" />
              <Text style={{ fontSize: 14, fontWeight: "500", color: "gray" }}>
                Guardar
              </Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "#718096",
              lineHeight: 22,
            }}
          >
            {testData.description}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 14,
            padding: 16,
            marginHorizontal: 20,
            gap: 12,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              color: "#2d3748",
            }}
          >
            {testData.title}
          </Text>

          {/* user info */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Image
                source={require("../../assets/images/icon.png")}
                style={{ width: 35, height: 35 }}
              />
              <View style={{}}>
                <Text
                  style={{ fontSize: 14, fontWeight: "500", color: "#2d3748" }}
                >
                  por
                </Text>
                <Text style={{ fontSize: 14, fontWeight: "600" }}>
                  {testData.user.username}
                </Text>
              </View>
            </View>
            {/* Read the text */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                paddingVertical: 8,
                paddingHorizontal: 12,
                backgroundColor: "#fff2ed",
                borderRadius: 16,
              }}
            >
              <Ionicons name="volume-high" size={20} color={COLORS.primary} />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: COLORS.primary,
                }}
              >
                Reproducir
              </Text>
            </TouchableOpacity>
          </View>

          {/* Likes */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              gap: 8,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Ionicons name="heart" size={20} color="#ef4444" />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: COLORS.primary,
                }}
              >
                {testData.likes}
              </Text>
            </TouchableOpacity>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Ionicons name="time" size={20} color="gray" />
              <Text style={{ fontSize: 14, fontWeight: "500", color: "gray" }}>
                {testData.totalTime} min
              </Text>
            </View>

            {/* Download */}
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Ionicons name="cloud-download" size={20} color="gray" />
              <Text style={{ fontSize: 14, fontWeight: "500", color: "gray" }}>
                Guardar
              </Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "#718096",
              lineHeight: 22,
            }}
          >
            {testData.description}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 14,
            padding: 16,
            marginHorizontal: 20,
            gap: 12,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              color: "#2d3748",
            }}
          >
            {testData.title}
          </Text>

          {/* user info */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Image
                source={require("../../assets/images/icon.png")}
                style={{ width: 35, height: 35 }}
              />
              <View style={{}}>
                <Text
                  style={{ fontSize: 14, fontWeight: "500", color: "#2d3748" }}
                >
                  por
                </Text>
                <Text style={{ fontSize: 14, fontWeight: "600" }}>
                  {testData.user.username}
                </Text>
              </View>
            </View>
            {/* Read the text */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                paddingVertical: 8,
                paddingHorizontal: 12,
                backgroundColor: "#fff2ed",
                borderRadius: 16,
              }}
            >
              <Ionicons name="volume-high" size={20} color={COLORS.primary} />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: COLORS.primary,
                }}
              >
                Reproducir
              </Text>
            </TouchableOpacity>
          </View>

          {/* Likes */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              gap: 8,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Ionicons name="heart" size={20} color="#ef4444" />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: COLORS.primary,
                }}
              >
                {testData.likes}
              </Text>
            </TouchableOpacity>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Ionicons name="time" size={20} color="gray" />
              <Text style={{ fontSize: 14, fontWeight: "500", color: "gray" }}>
                {testData.totalTime} min
              </Text>
            </View>

            {/* Download */}
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Ionicons name="cloud-download" size={20} color="gray" />
              <Text style={{ fontSize: 14, fontWeight: "500", color: "gray" }}>
                Guardar
              </Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "#718096",
              lineHeight: 22,
            }}
          >
            {testData.description}
          </Text>
        </View>
      </Animated.ScrollView>
    </KeyboardAvoidingView>
  );
};

export default DetailsScreen;
