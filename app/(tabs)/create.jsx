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
import {
  Buttons,
  Form,
  AIStyles,
  Base,
} from "../../assets/styles/create/create.styles";
import ImagePickerComponent from "../../components/ImagePickerComponent";
import BottomSheetManager from "../../components/BottomSheetManager";
import RadioButtonGroup from "../../components/RadioButtonGroup";
import useCreate from "../../hooks/useCreate";
import useBottomSheet from "../../hooks/useBottomSheet";

const RadioOption = (title, subtitle) => (
  <View style={Buttons.textContainerRadio}>
    <Text style={Buttons.titleRadio}>{title}</Text>
    <Text style={Buttons.subtitleRadio}>{subtitle}</Text>
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
    BottomSheetConfig,
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
        contentContainerStyle={Base.container}
        style={Base.scrollViewStyle}
        nestedScrollEnabled={true}
      >
        {/* Header */}
        <View style={Base.header}>
          <Text style={Base.title}>Crear Receta</Text>
          <Text style={Base.subtitle}>
            Comparte tus recetas favoritas con los demás.
          </Text>
        </View>

        {/* AI Button */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={AIStyles.containerAI}
        >
          <View style={AIStyles.textContainerAI}>
            <Text style={AIStyles.titleAI}>¿Necesitas ayuda?</Text>
            <Text style={AIStyles.subtitleAI}>
              Utiliza una foto de la receta para registrar la información.
            </Text>
          </View>
          <TouchableOpacity style={Buttons.buttonAI}>
            <Ionicons name="pencil-outline" size={15} color={COLORS.primary} />
            <Text style={Buttons.buttonTextAI}>Rellenar con IA</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={Base.card}>
          <Text style={Base.titleCard}>Información básica</Text>
          {/* Form */}
          {/* Imagen */}
          <View style={Form.formGroup}>
            <Text style={Form.label}>Foto de la receta</Text>
            <ImagePickerComponent
              image={image}
              setImage={handleInputOnChange(filds.IMAGE)}
              setImageBase64={setImageBase64}
            />
          </View>

          {/* Title Input */}
          <View style={Form.formGroup}>
            <Text style={Form.label}>Título de la receta</Text>
            <View style={Form.inputContainer}>
              <Ionicons
                name="fast-food-outline"
                size={20}
                color={COLORS.textSecondary}
                style={Form.inputIcon}
              />
              <TextInput
                style={Form.input}
                placeholder="Ej. Pasta Carbonara Casera"
                placeholderTextColor={COLORS.placeholderText}
                value={title}
                onChangeText={handleInputOnChange(filds.TITLE)}
              />
            </View>
          </View>

          {/* Description Input */}
          <View style={Form.formGroup}>
            <Text style={Form.label}>Descripción</Text>
            <View style={Form.textAreaContainer}>
              <TextInput
                style={Form.textArea}
                placeholderTextColor={COLORS.placeholderText}
                placeholder="Describe tu receta..."
                onChangeText={handleInputOnChange(filds.DESCRIPTION)}
                textAlignVertical="top"
                value={description}
                multiline
              />
            </View>
          </View>

          {/* Time Input */}
          <View style={Form.formGroup}>
            <Text style={Form.label}>Tiempo total (minutos)</Text>
            <View style={Form.inputContainer}>
              <TextInput
                style={Form.input}
                placeholder="45"
                placeholderTextColor={COLORS.placeholderText}
                value={totalTime}
                onChangeText={handleInputOnChange(filds.TOTAL_TIME)}
                keyboardType="numeric"
                maxLength={4}
              />
              <Text style={Form.label}>min</Text>
            </View>
          </View>
        </View>

        {/* Categories bottom sheet */}
        <View style={Base.card}>
          <Text style={Base.titleCard}>Categorías</Text>
          <TouchableOpacity
            style={Buttons.buttonSecondary}
            onPress={() => handlePresentModalPress(BottomSheetViews.CATEGORIES)}
          >
            <Text style={Buttons.buttonText}>Seleccionar categorías</Text>
          </TouchableOpacity>
        </View>

        {/* Ingredientes */}
        <View style={Base.card}>
          <Text style={Base.titleCard}>Ingredientes</Text>
          <TouchableOpacity
            style={{ ...Buttons.buttonSecondary, marginBottom: 5 }}
            onPress={() =>
              handlePresentModalPress(BottomSheetViews.NEW_INGREDIENT)
            }
          >
            <Text style={Buttons.buttonText}>Agregar ingrediente</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={Buttons.buttonSecondary}
            onPress={() =>
              handlePresentModalPress(BottomSheetViews.INGREDIENTS)
            }
          >
            <Text style={Buttons.buttonText}>Ver ingredientes</Text>
          </TouchableOpacity>
        </View>

        {/* Steps */}
        <View style={Base.card}>
          <Text style={Base.titleCard}>Pasos de preparación</Text>
          <TouchableOpacity
            style={{ ...Buttons.buttonSecondary, marginBottom: 5 }}
            onPress={() => handlePresentModalPress(BottomSheetViews.NEW_STEP)}
          >
            <Text style={Buttons.buttonText}>Agregar paso</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={Buttons.buttonSecondary}
            onPress={() => handlePresentModalPress(BottomSheetViews.STEPS)}
          >
            <Text style={Buttons.buttonText}>Ver pasos</Text>
          </TouchableOpacity>
        </View>

        {/* Status option */}
        <View style={Base.card}>
          <Text style={Base.titleCard}>Configuración de privacidad</Text>
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
        <TouchableOpacity style={Buttons.buttonSubmit} onPress={handleSubmit}>
          <Text style={Buttons.buttonTextSubmit}>Guardar Receta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={Buttons.buttonPreview}
          onPress={handlePreview}
          disabled={true}
        >
          <Text style={Buttons.buttonTextPreview}>Vista previa</Text>
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
