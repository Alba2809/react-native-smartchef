import { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import styles from "../../assets/styles/create.styles";
import CategoryPicker from "../../components/CategoryPicker";
import ImagePickerComponent from "../../components/ImagePickerComponent";
import DropDownPicker from "react-native-dropdown-picker"
import IngredientInput from "../../components/IngredientInput";

export default function create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);
  const [items, setItems] = useState([
    { label: 'Gramos', value: 'gr' },
    { label: 'Litros', value: 'ltr' },
    { label: 'Piezas', value: 'piezas' },
  ]);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {};

  const handleCategory = (category) => {
    /* Add category to categories array, if it doesn't exist, otherwise remove it */
    if (categories.includes(category)) {
      setCategories(categories.filter((c) => c !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: 0, unit: null, open: false }]);
  };

  console.log(ingredients)

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

            {/* Categories list */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Categorías</Text>
              {CategoryPicker(handleCategory, categories)}
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
                style={styles.button}
                onPress={handleAddIngredient}
              >
                <Text style={styles.buttonText}>Agregar ingrediente</Text>
              </TouchableOpacity>
              <View style={styles.ingredientsContainer}>
                <IngredientInput
                  ingredients={ingredients}
                  setIngredients={setIngredients}
                />
              </View>
            </View>

            {/* Picker */}
            {/* <View style={{ flex: 1, padding: 20 }}>
              <DropDownPicker
                open={open}
                setOpen={setOpen}
                items={items}
                value={selected}
                setValue={setSelected}
                setItems={setItems}
                placeholder="Selecciona una categoría"
                listMode="SCROLLVIEW"
               />
            </View> */}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
