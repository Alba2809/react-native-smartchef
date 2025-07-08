import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../constants/colors";
import styles from "../../assets/styles/create.styles";
import ImagePickerComponent from "../../components/ImagePickerComponent";
import BottomSheetManager from "../../components/BottomSheetManager";
import RadioButtonGroup from "../../components/RadioButtonGroup";
import useCreate from "../../hooks/useCreate";
import useBottomSheet from "../../hooks/useBottomSheet";

const RadioOption = (title, subtitle) => (
  <View style={styles.textContainerRadio}>
    <Text style={styles.titleRadio}>{title}</Text>
    <Text style={styles.subtitleRadio}>{subtitle}</Text>
  </View>
);

export default function create() {
  const {
    /* Form State */
    title,
    description,
    image,
    totalTime,
    ingredients,
    steps,
    categories,
    handleInputOnChange,
    filds,

    /* Form state functions */
    handleCategory,
    handleAddIngredient,
    handleRemoveIngredient,
    handleAddStep,
    handleRemoveStep,

    /* Private state */
    STATUS_OPTIONS,
    status,
    setStatus,

    /* Image state */
    setImageBase64,

    /* Submit state */
    handleSubmit,
    handlePreview,

    /* Bottom sheet manager */
    BottomSheetViews,
    BottomSheetConfig
  } = useCreate();

  const {
    handlePresentModalPress,
    bottomSheetRef,
    currentBsConfig,
    bottomSheetContent,
  } = useBottomSheet({
    BottomSheetViews,
    BottomSheetConfig,
    dataProps: {
      handleCategory,
      categories,
      ingredients,
      handleAddIngredient,
      handleRemoveIngredient,
      steps,
      handleAddStep,
      handleRemoveStep,
      totalSteps: steps.length || 0,
    },
  });

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
              setImage={handleInputOnChange(filds.IMAGE)}
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
                onChangeText={handleInputOnChange(filds.TITLE)}
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
              onChangeText={handleInputOnChange(filds.DESCRIPTION)}
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
                onChangeText={handleInputOnChange(filds.TOTAL_TIME)}
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
            onPress={() => handlePresentModalPress(BottomSheetViews.NEW_STEP)}
          >
            <Text style={styles.buttonText}>Agregar paso</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={() => handlePresentModalPress(BottomSheetViews.STEPS)}
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
                value: STATUS_OPTIONS.PRIVATE,
                content: RadioOption(
                  "Guardar localmente",
                  "Solo tú podrás ver esta receta"
                ),
              },
              {
                value: STATUS_OPTIONS.PUBLIC,
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
          {bottomSheetContent}
        </BottomSheetManager>
      )}
    </KeyboardAvoidingView>
  );
}
