import { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import styles from "../../assets/styles/create.styles";
import CategoryPicker from "../../components/CategoryPicker";
import ImagePickerComponent from "../../components/ImagePickerComponent";
import BottomSheetManager from "../../components/BottomSheetManager";
import IngredientInput from "../../components/IngredientInput";
import IngredientsList from "../../components/IngredientsList";

const BottomSheetViews = {
  CATEGORIES: "CATEGORIES",
  INGREDIENTS: "INGREDIENTS",
  NEW_INGREDIENT: "NEW_INGREDIENT",
};

const bottomSheetConfig = {
  [BottomSheetViews.CATEGORIES]: {
    title: "Selecciona las categorías",
    snapPoints: ["40%"],
    content: (props) => (
      <CategoryPicker
        handleCategory={props.handleCategory}
        categoriesSelected={props.categories}
      />
    ),
  },
  [BottomSheetViews.INGREDIENTS]: {
    title: "Ingredientes ingresados",
    snapPoints: ["70%"],
    content: (props) => (
      <IngredientsList
        ingredients={props.ingredients}
        handleRemoveIngredient={props.handleRemoveIngredient}
      />
    ),
  },
  [BottomSheetViews.NEW_INGREDIENT]: {
    title: "Nuevo ingrediente",
    snapPoints: ["40%"],
    content: (props) => (
      <IngredientInput handleAddIngredient={props.handleAddIngredient} />
    ),
  },
};

export default function create() {
  /* Form State Variables */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [categories, setCategories] = useState([]);

  /* Test data */
  const [selected, setSelected] = useState(null);
  const [items, setItems] = useState([
    { label: "Gramos", value: "gr" },
    { label: "Litros", value: "ltr" },
    { label: "Piezas", value: "piezas" },
  ]);
  const [open, setOpen] = useState(false);

  /* Bottom sheet manager */
  const bottomSheetRef = useRef(null);
  const snapPoints = ["40%", "70%"];
  const [bsView, setBsView] = useState(BottomSheetViews.CATEGORIES);
  const currentBsConfig = bottomSheetConfig[bsView];

  const router = useRouter();

  const handleSubmit = async () => {};

  const handlePresentModalPress = useCallback((keyView) => {
    setBsView(keyView);
    bottomSheetRef.current?.present();
  }, []);

  const handleCategory = (category) => {
    /* Add category to categories array, if it doesn't exist, otherwise remove it */
    if (categories.includes(category)) {
      setCategories(categories.filter((c) => c !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  const handleAddIngredient = (newIngredient) => {
    setIngredients((prev) => [...prev, newIngredient]);
    ToastAndroid.showWithGravity(
      "Ingrediente agregado",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);

    setIngredients(newIngredients);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.scrollViewStyle}
        nestedScrollEnabled={true}
      >
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Crear Receta</Text>
            <Text style={styles.subtitle}>
              Comparte tus recetas favoritas con los demás.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Title Input */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Título</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="fast-food-outline"
                  size={20}
                  color={COLORS.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Ingrese el título de la receta"
                  placeholderTextColor={COLORS.placeholderText}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>

            {/* Description Input */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Descripción</Text>
              <TextInput
                style={styles.textArea}
                placeholder="¿De qué se trata la receta?"
                placeholderTextColor={COLORS.placeholderText}
                value={description}
                onChangeText={setDescription}
                multiline
                textAlignVertical="top"
              />
            </View>

            {/* Categories bottom sheet */}
            <View style={styles.formGroup}>
              <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={() =>
                  handlePresentModalPress(BottomSheetViews.CATEGORIES)
                }
              >
                <Text style={styles.buttonText}>Seleccionar categorías</Text>
              </TouchableOpacity>
            </View>

            {/* Imagen */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Imagen de la receta</Text>
              <ImagePickerComponent
                image={image}
                setImage={setImage}
                setImageBase64={setImageBase64}
              />
            </View>

            {/* Ingredientes */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Ingredientes</Text>
              <TouchableOpacity
                style={{ ...styles.buttonSecondary, marginBottom: 5 }}
                onPress={() =>
                  handlePresentModalPress(BottomSheetViews.NEW_INGREDIENT)
                }
              >
                <Text style={styles.buttonText}>Agregar ingrediente</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={() =>
                  handlePresentModalPress(BottomSheetViews.INGREDIENTS)
                }
              >
                <Text style={styles.buttonText}>Ver ingredientes</Text>
              </TouchableOpacity>
            </View>

            {/* Bottom sheet manager */}
            {currentBsConfig && (
              <BottomSheetManager
                bottomSheetRef={bottomSheetRef}
                title={currentBsConfig.title}
                snapPoints={currentBsConfig.snapPoints}
              >
                {currentBsConfig.content({
                  handleCategory,
                  categories,
                  ingredients,
                  handleAddIngredient,
                  handleRemoveIngredient
                })}
              </BottomSheetManager>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
