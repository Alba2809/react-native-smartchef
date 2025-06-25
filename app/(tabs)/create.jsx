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
import { LinearGradient } from "expo-linear-gradient";
import Toast from 'react-native-toast-message';
import COLORS from "../../constants/colors";
import styles from "../../assets/styles/create.styles";
import CategoryPicker from "../../components/CategoryPicker";
import ImagePickerComponent from "../../components/ImagePickerComponent";
import BottomSheetManager from "../../components/BottomSheetManager";
import IngredientInput from "../../components/IngredientInput";
import IngredientsList from "../../components/IngredientsList";
import RadioButtonGroup from "../../components/RadioButtonGroup";
import StepsList from "../../components/StepsList";
import StepInput from "../../components/StepInput";

const BottomSheetViews = {
  CATEGORIES: "CATEGORIES",
  INGREDIENTS: "INGREDIENTS",
  NEW_INGREDIENT: "NEW_INGREDIENT",
  STEPS: "STEPS",
  NEW_STEP: "NEW_STEP",
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
  [BottomSheetViews.STEPS]: {
    title: "Pasos ingresados",
    snapPoints: ["70%"],
    content: (props) => (
      <StepsList
        steps={props.steps}
        handleRemoveStep={props.handleRemoveStep}
      />
    ),
  },
  [BottomSheetViews.NEW_STEP]: {
    title: "Nuevo paso de preparación",
    snapPoints: ["50%"],
    content: (props) => (
      <StepInput handleAddStep={props.handleAddStep} totalSteps={props.totalSteps} />
    ),
  },
};

const STATUS = {
  PRIVATE: "Privado",
  PUBLIC: "Público",
};

const RadioOption = (title, subtitle) => (
  <View style={styles.textContainerRadio}>
    <Text style={styles.titleRadio}>{title}</Text>
    <Text style={styles.subtitleRadio}>{subtitle}</Text>
  </View>
);

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
  const [status, setStatus] = useState(STATUS.PRIVATE);

  /* Bottom sheet manager */
  const bottomSheetRef = useRef(null);
  const [bsView, setBsView] = useState(BottomSheetViews.CATEGORIES);
  const currentBsConfig = bottomSheetConfig[bsView];

  const router = useRouter();

  const handleSubmit = async () => {};

  const handlePreview = async () => {};

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
    Toast.show({
      type: "success",
      text1: "Ingrediente agregado",
      position: "top",
      text1Style: { fontSize: 14 },
    })
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);

    setIngredients(newIngredients);

    Toast.show({
      type: "success",
      text1: "Ingrediente eliminado",
      position: "top",
      text1Style: { fontSize: 14 },
    })
  };

  const handleAddStep = (newStep) => {
    setSteps((prev) => [...prev, newStep]);
    Toast.show({
      type: "success",
      text1: "Paso de preparación agregado",
      position: "top",
      text1Style: { fontSize: 14 },
    })
  }

  const handleRemoveStep = (index) => {
    const newSteps = steps.filter((_, i) => i !== index);

    /* Update number attribute */
    newSteps.forEach((step, i) => {
      step.number = i + 1;
    });

    setSteps(newSteps);

    Toast.show({
      type: "success",
      text1: "Paso de preparación eliminado",
      position: "top",
      text1Style: { fontSize: 14 },
    })
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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Crear Receta</Text>
          <Text style={styles.subtitle}>
            Comparte tus recetas favoritas con los demás.
          </Text>
        </View>

        {/* AI Button */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.containerAI}
        >
          <View style={styles.textContainerAI}>
            <Text style={styles.titleAI}>¿Necesitas ayuda?</Text>
            <Text style={styles.subtitleAI}>
              Utiliza una foto de la receta para registrar la información.
            </Text>
          </View>
          <TouchableOpacity style={styles.buttonAI}>
            <Ionicons name="pencil-outline" size={15} color={COLORS.primary} />
            <Text style={styles.buttonTextAI}>Rellenar con IA</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.card}>
          <Text style={styles.titleCard}>Información básica</Text>
          {/* Form */}
          {/* Imagen */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Foto de la receta</Text>
            <ImagePickerComponent
              image={image}
              setImage={setImage}
              setImageBase64={setImageBase64}
            />
          </View>

          {/* Title Input */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Título de la receta</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="fast-food-outline"
                size={20}
                color={COLORS.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Ej. Pasta Carbonara Casera"
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
              placeholderTextColor={COLORS.placeholderText}
              placeholder="Describe tu receta..."
              onChangeText={setDescription}
              textAlignVertical="top"
              value={description}
              multiline
            />
          </View>

          {/* Time Input */}
          <View>
            <Text style={styles.label}>Tiempo total (minutos)</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="45"
                placeholderTextColor={COLORS.placeholderText}
                value={totalTime}
                onChangeText={setTotalTime}
                keyboardType="numeric"
                maxLength={4}
              />
              <Text style={styles.label}>min</Text>
            </View>
          </View>
        </View>

        {/* Categories bottom sheet */}
        <View style={styles.card}>
          <Text style={styles.titleCard}>Categorías</Text>
          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={() => handlePresentModalPress(BottomSheetViews.CATEGORIES)}
          >
            <Text style={styles.buttonText}>Seleccionar categorías</Text>
          </TouchableOpacity>
        </View>

        {/* Ingredientes */}
        <View style={styles.card}>
          <Text style={styles.titleCard}>Ingredientes</Text>
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

        {/* Steps */}
        <View style={styles.card}>
          <Text style={styles.titleCard}>Pasos de preparación</Text>
          <TouchableOpacity
            style={{ ...styles.buttonSecondary, marginBottom: 5 }}
            onPress={() =>
              handlePresentModalPress(BottomSheetViews.NEW_STEP)
            }
          >
            <Text style={styles.buttonText}>Agregar paso</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={() =>
              handlePresentModalPress(BottomSheetViews.STEPS)
            }
          >
            <Text style={styles.buttonText}>Ver pasos</Text>
          </TouchableOpacity>
        </View>

        {/* Status option */}
        <View style={styles.card}>
          <Text style={styles.titleCard}>Configuración de privacidad</Text>
          <RadioButtonGroup
            selectedValue={status}
            onChange={setStatus}
            options={[
              {
                value: STATUS.PRIVATE,
                content: RadioOption(
                  "Guardar localmente",
                  "Solo tú podrás ver esta receta"
                ),
              },
              {
                value: STATUS.PUBLIC,
                content: RadioOption(
                  "Hacer pública",
                  "Otros usuarios podrán encontrar tu receta"
                ),
              },
            ]}
          />
        </View>

        {/* Submit button */}
        <TouchableOpacity style={styles.buttonSubmit} onPress={handleSubmit}>
          <Text style={styles.buttonTextSubmit}>Guardar Receta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonPreview}
          onPress={handlePreview}
          disabled={true}
        >
          <Text style={styles.buttonTextPreview}>Vista previa</Text>
        </TouchableOpacity>
      </ScrollView>

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
            handleRemoveIngredient,
            steps,
            handleAddStep,
            handleRemoveStep,
            totalSteps: steps.length || 0,
          })}
        </BottomSheetManager>
      )}
    </KeyboardAvoidingView>
  );
}
