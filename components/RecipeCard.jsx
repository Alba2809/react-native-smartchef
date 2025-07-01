import { Image, Text, TouchableOpacity, View } from "react-native";
import COLORS from "../constants/colors";

const RecipeCard = ({ item }) => {
  const redirectToRecipeDetails = (itemId) => {
    console.log(itemId);
    router.push(`/recipe/${itemId}`);
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
      </View>
      <View style={{ padding: 16, flex: 1, flexDirection: "column", gap: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: "500", color: "#2d3748",  }}>
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
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Image
            source={require("../assets/images/icon.png")}
            style={{ width: 35, height: 35 }}
          />
          <Text style={{ fontSize: 14, fontWeight: "500" }}>
            {item.user.username}
          </Text>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            borderColor: "lightgray",
            width: "100%",
          }}
        ></View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity onPress={() => recipeDetails(item._id)}>
            <Text
              style={{ fontSize: 16, fontWeight: "500", color: COLORS.primary }}
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
