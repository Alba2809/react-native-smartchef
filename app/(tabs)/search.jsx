import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import COLORS from "../../constants/colors";
import RecipeCard from "../../components/RecipeCard";

export default function search() {
  const testRecipes = [
    {
      _id: 1,
      title: "Pasta Casbonara Clásica",
      description:
        "Una receta de pan con tomate, una receta de pan con tomate una receta de pan con tomate una receta de pan con tomate una receta de pan con tomate",
      image: "../../assets/images/pasta.jpeg",
      totalTime: 10,
      ingredients: ["Tomate", "Agua"],
      steps: ["Paso 1", "Paso 2", "Paso 3"],
      categories: ["Entrantes", "Categoria 2", "Categoria 3", "Categoria 4"],
      user: {
        username: "John Doe",
      },
    },
    {
      _id: 2,
      title: "Pasta Casbonara Clásica",
      description:
        "Una receta de pan con tomate, una receta de pan con tomate una receta de pan con tomate una receta de pan con tomate una receta de pan con tomate",
      image: "../../assets/images/pasta.jpeg",
      totalTime: 10,
      ingredients: ["Tomate", "Agua"],
      steps: ["Paso 1", "Paso 2", "Paso 3"],
      categories: ["Entrantes", "Recetas de cocina"],
      user: {
        username: "John Doe",
      },
    },
    {
      _id: 3,
      title: "Pasta Casbonara Clásica",
      description:
        "Una receta de pan con tomate, una receta de pan con tomate una receta de pan con tomate una receta de pan con tomate una receta de pan con tomate",
      image: "../../assets/images/pasta.jpeg",
      totalTime: 10,
      ingredients: ["Tomate", "Agua"],
      steps: ["Paso 1", "Paso 2", "Paso 3"],
      categories: ["Entrantes", "Recetas de cocina"],
      user: {
        username: "John Doe",
      },
    },
  ];

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: COLORS.background,
        padding: 16,
        fontFamily: "JetBrainsMono-Medium",
        gap: 10
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Search Header */}
      <View
        style={{
          flexDirection: "column",
          backgroundColor: COLORS.white,
          borderRadius: 14,
          padding: 8,
          gap: 14,

          shadowColor: COLORS.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            backgroundColor: COLORS.inputBackground,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: COLORS.border,
            paddingHorizontal: 8,
          }}
        >
          <Ionicons name="search-outline" size={20} />
          <TextInput
            style={{
              fontSize: 14,
              fontFamily: "JetBrainsMono-Medium",
              color: "black",
              flex: 1,
            }}
            placeholder="Buscar receta..."
            placeholderTextColor="gray"
          />
          <TouchableOpacity style={{}}>
            <Ionicons name="filter-outline" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Results */}
      <View
        style={{
          flex: 1,
          borderRadius: 14,
        }}
      >
        {/* Title */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: COLORS.black,
            paddingHorizontal: 10
          }}
        >
          Resultados de búsqueda
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
            color: COLORS.textSecondary,
            marginBottom: 10,
            paddingHorizontal: 10
          }}
        >
          {testRecipes.length} recetas encontradas
        </Text>

        {
          testRecipes.length === 0 && (
            <Text
              style={{
                fontSize: 15,
                color: COLORS.textSecondary,
                paddingHorizontal: 10,
              }}
            >
              No se han encontrado resultados...
            </Text>
          )
        }

        {/* List */}
        <FlatList
          data={testRecipes}
          renderItem={({ item }) => <RecipeCard item={item} showHeart={true} />}
          keyExtractor={(item, index) => index.toString()}
          style={{
            flex: 1,
            borderRadius: 14,
            paddingHorizontal: 10,
          }}
          contentContainerStyle={{ gap: 20 }}
        />

        {/* Fade bottom */}
        {/* <LinearGradient
          colors={["transparent", COLORS.background]}
          locations={[0.3, 1]}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 30,
            zIndex: 2,
          }}
          pointerEvents="none"
         /> */}
      </View>
    </KeyboardAvoidingView>
  );
}
