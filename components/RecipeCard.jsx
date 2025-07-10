import { Image, Text, TouchableOpacity, View } from "react-native";
import COLORS from "../constants/colors";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const RecipeCard = ({ item, showHeart = false }) => {
  const redirectToRecipeDetails = (itemId) => {
    router.push(`/details/${itemId}`);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        flexDirection: "column",
        borderRadius: 14,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          height: 200,
        }}
      >
        <Image source={item.image} style={{ width: "100%", height: "100%" }} />
        <View
          style={{
            backgroundColor: COLORS.primary,
            borderRadius: 12,
            paddingHorizontal: 8,
            paddingVertical: 4,
            position: "absolute",
            left: 8,
            top: 8,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              color: COLORS.white,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {item.totalTime} min
          </Text>
        </View>
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            position: "absolute",
            bottom: 10,
            left: 10,
            backgroundColor: COLORS.white,
            borderRadius: 12,
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "500" }}>
            {item.user.username}
          </Text>
        </View> */}
        {showHeart && (
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "#e9e9e8",
              borderRadius: 100,
              width: 40,
              height: 40,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="heart-outline" size={23} color="gray" />
          </TouchableOpacity>
        )}
      </View>
      <View style={{ padding: 16, flex: 1, flexDirection: "column", gap: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: "500", color: "#2d3748" }}>
          {item.title}
        </Text>
        <Text
          style={{
            color: "#718096",
            fontWeight: "500",
            fontSize: 15,
            lineHeight: 22,
          }}
          numberOfLines={6}
        >
          {item.description}
        </Text>
        <View
          style={{
            borderTopWidth: 1,
            borderColor: "lightgray",
            width: "100%",
          }}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => redirectToRecipeDetails(item._id)}
            style={{ width: "100%" }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: COLORS.primary,
                textAlign: "center",
              }}
            >
              Ver receta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RecipeCard;
