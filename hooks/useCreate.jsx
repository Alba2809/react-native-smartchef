import { useReducer, useRef, useState } from "react";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import useAuthStore from "../store/authStore";
import API_URL from "../constants/api";
import Toast from "react-native-toast-message";
import StepInput from "../components/StepInput";
import StepsList from "../components/StepsList";
import IngredientInput from "../components/IngredientInput";
import IngredientsList from "../components/IngredientsList";
import CategoryPicker from "../components/CategoryPicker";
import { createRecipe } from "../api/recipe";
import useRecipeStore from "../store/recipeStore";

const BottomSheetViews = {
  CATEGORIES: "CATEGORIES",
  INGREDIENTS: "INGREDIENTS",
  NEW_INGREDIENT: "NEW_INGREDIENT",
  STEPS: "STEPS",
  NEW_STEP: "NEW_STEP",
};

const BottomSheetConfig = {
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
      <StepInput
        handleAddStep={props.handleAddStep}
        totalSteps={props.totalSteps}
      />
    ),
  },
};

const STATUS_OPTIONS = {
  PRIVATE: "Privado",
  PUBLIC: "Público",
};

export default function useCreate() {
  /* Form State Structure */
  const [formState, updateFormState] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    {
      title: "",
      description: "",
      image: "",
      totalTime: 0,
      ingredients: [],
      steps: [],
      categories: [],
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  const [imageBase64, setImageBase64] = useState(null);
  const filds = {
    TITLE: "title",
    DESCRIPTION: "description",
    IMAGE: "image",
    TOTAL_TIME: "totalTime",
  };

  const router = useRouter();

  // get user token
  const { token, user } = useAuthStore();

  const { saveLocalRecipe } = useRecipeStore();

  /* Bottom sheet */
  const bottomSheetRef = useRef(null);

  /*  */
  const [status, setStatus] = useState(STATUS_OPTIONS.PRIVATE);

  const handleSubmit = async () => {
    if (isLoading) return;

    const {
      title,
      description,
      image,
      totalTime,
      ingredients,
      steps,
      categories,
    } = formState;

    // validate that all fields are filled
    if (
      !title.trim() ||
      !description.trim() ||
      !image ||
      !totalTime.trim() ||
      !ingredients.length ||
      !steps.length ||
      !categories.length
    ) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Faltan campos obligatorios",
        position: "top",
        text1Style: { fontSize: 14 },
      });
      return;
    }

    try {
      setIsLoading(true);

      // get file extension form URI or default to jpeg
      const uriParts = image.split(".");
      const fileType = uriParts[uriParts.length - 1];
      const imageType = fileType
        ? `image/${fileType.toLowerCase()}`
        : "image/jpeg";

      const imageDataUrl = `data:${imageType};base64,${imageBase64}`;

      const dataFormatted = {
        title: title.trim(),
        description: description.trim(),
        totalTime: +totalTime,
        ingredients,
        steps,
        categories,
      }
      const currentDate = new Date();

      // save recipe to local storage
      await handleSaveLocal(
        {
          _id: currentDate.getTime(),
          ...dataFormatted,
          favoriteCount: 0,
          createdAt: currentDate.toISOString(),
          updatedAt: currentDate.toISOString(),
          type: "local",
          user,
        },
        image,
        fileType
      );

      let message = "Su receta ha si guardada"

      // send recipe to backend if user have selected public status
      if (status === STATUS_OPTIONS.PUBLIC) {
        await handlePublish({
          ...dataFormatted,
          image: imageDataUrl,
        });

        message = "Su receta ha sido publicada y guardada";
      }

      Toast.show({
        type: "success",
        text1: message,
        position: "top",
        text1Style: { fontSize: 14 },
      });

      // reset form state
      updateFormState({
        title: "",
        description: "",
        image: "",
        totalTime: 0,
        ingredients: [],
        steps: [],
        categories: [],
      });

      // redirect to home page
      router.replace("/");
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo registrar la receta",
        position: "top",
        text1Style: { fontSize: 14 },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveLocal = async (data, imageuri, imageType) => {
    const imageFileName = `recipe_${Date.now()}.${imageType}`;
    const localImageUri = await saveLocalImage(imageuri, imageFileName);

    const recipe = {
      ...data,
      image: localImageUri,
    };

    await saveLocalRecipe(recipe);
  };

  const handlePublish = async (formData) => {
    const res = await createRecipe(formData, token);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Error al publicar la receta");
    }
  };

  const handlePreview = async () => {};

  const saveLocalImage = async (originalUri, filename) => {
    const destinationUri = `${FileSystem.documentDirectory}recipes/${filename}`;

    // Asegúrate de que el directorio exista
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}recipes`,
      {
        intermediates: true,
      }
    );

    await FileSystem.copyAsync({
      from: originalUri,
      to: destinationUri,
    });

    return destinationUri;
  };

  const handleCategory = (category) => {
    /* Add category to categories array, if it doesn't exist, otherwise remove it */
    const { categories } = formState;
    if (categories.includes(category)) {
      updateFormState({ categories: categories.filter((c) => c !== category) });
    } else {
      updateFormState({ categories: [...categories, category] });
    }
  };

  const handleAddIngredient = (newIngredient) => {
    const { ingredients } = formState;
    updateFormState({ ingredients: [...ingredients, newIngredient] });

    Toast.show({
      type: "success",
      text1: "Ingrediente agregado",
      position: "top",
      text1Style: { fontSize: 14 },
    });
  };

  const handleRemoveIngredient = (index) => {
    const { ingredients } = formState;
    const newIngredients = ingredients.filter((_, i) => i !== index);

    updateFormState({ ingredients: newIngredients });

    Toast.show({
      type: "success",
      text1: "Ingrediente eliminado",
      position: "top",
      text1Style: { fontSize: 14 },
    });
  };

  const handleAddStep = (newStep) => {
    const { steps } = formState;
    updateFormState({ steps: [...steps, newStep] });

    Toast.show({
      type: "success",
      text1: "Paso de preparación agregado",
      position: "top",
      text1Style: { fontSize: 14 },
    });
  };

  const handleRemoveStep = (index) => {
    const { steps } = formState;
    const newSteps = steps.filter((_, i) => i !== index);

    /* Update number attribute */
    newSteps.forEach((step, i) => {
      step.number = i + 1;
    });

    updateFormState({ steps: newSteps });

    Toast.show({
      type: "success",
      text1: "Paso de preparación eliminado",
      position: "top",
      text1Style: { fontSize: 14 },
    });
  };

  const handleInputOnChange = (key) => (value) => {
    updateFormState({ [key]: value });
  };

  return {
    /* Form State */
    title: formState.title,
    description: formState.description,
    image: formState.image,
    totalTime: formState.totalTime,
    ingredients: formState.ingredients,
    steps: formState.steps,
    categories: formState.categories,
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

    /* Bottom sheet */
    BottomSheetViews,
    BottomSheetConfig,
  };
}
