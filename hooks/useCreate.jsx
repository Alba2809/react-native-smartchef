import { useReducer, useRef, useState } from "react";
import { useRouter } from "expo-router";
import { createRecipe } from "../api/recipe";
import {
  processWithOCR,
  processWithNewIdea,
  processWithImage,
} from "../api/ai";
import { getImageData, getImageType } from "../utils/image";
import * as FileSystem from "expo-file-system";
import useAuthStore from "../store/authStore";
import Toast from "react-native-toast-message";
import StepInput from "../components/StepInput";
import StepsList from "../components/StepsList";
import IngredientInput from "../components/IngredientInput";
import IngredientsList from "../components/IngredientsList";
import CategoryPicker from "../components/CategoryPicker";
import useRecipeStore from "../store/recipeStore";
import AITabs from "../components/AITabs";

const BottomSheetViews = {
  CATEGORIES: "CATEGORIES",
  INGREDIENTS: "INGREDIENTS",
  NEW_INGREDIENT: "NEW_INGREDIENT",
  STEPS: "STEPS",
  NEW_STEP: "NEW_STEP",
  AI_OPTIONS: "AI_OPTIONS",
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
  [BottomSheetViews.AI_OPTIONS]: {
    title: "Opciones de IA",
    snapPoints: ["60%"],
    content: (props) => (
      <AITabs
        ExtractTextOptions={props.ExtractTextOptions}
        NewRouteOptions={props.NewRouteOptions}
        FromPhotoRouteOptions={props.FromPhotoRouteOptions}
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
  const bottomSheetRef = useRef(null);

  const router = useRouter();

  // get user token
  const { token, user } = useAuthStore();

  const { saveLocalRecipe, updateLocalRecipe } = useRecipeStore();

  /*  */
  const [status, setStatus] = useState(STATUS_OPTIONS.PRIVATE);

  const handleSubmit = async () => {
    try {
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
        !String(totalTime).trim() ||
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

      setIsLoading(true);

      // get file extension form URI or default to jpeg
      const fileType = getImageType(image);
      const imageDataUrl = await getImageData(image, imageBase64);

      const dataFormatted = {
        title: title.trim(),
        description: description.trim(),
        totalTime: parseInt(totalTime),
        ingredients,
        steps,
        categories,
      };
      const currentDate = new Date();
      const newId = currentDate.getTime().toString();

      // save recipe to local storage
      const localRecipe =await handleSaveLocal(
        {
          _id: newId,
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

      Toast.show({
        type: "success",
        text1: "Se ha guardado la receta localmente",
        position: "top",
        text1Style: { fontSize: 14 },
      });

      // send recipe to backend if user have selected public status
      if (status === STATUS_OPTIONS.PUBLIC) {
        const recipePublished = await handlePublish({
          ...dataFormatted,
          image: imageDataUrl,
        });

        // after publishing, update the local recipe with the new _id
        updateLocalRecipe(newId, {
          ...localRecipe,
          _id: recipePublished._id,
          uploaded: true,
        });

        Toast.show({
          type: "success",
          text1: "Se ha publicado la receta",
          position: "top",
          text1Style: { fontSize: 14 },
        });
      }

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
      setImageBase64(null);

      // redirect to home page
      router.replace("/");
    } catch (error) {
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

    return recipe;
  };

  const handlePublish = async (formData) => {
    const res = await createRecipe(formData, token);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Error al publicar la receta");
    }

    return data.recipe
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

  /* AI - OCR Option */
  const [extractTextState, updateExtractTextState] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    {
      isLoading: false,
      error: null,
      image: null,
      imageBase64: null,
      text: null,
    }
  );

  const handleExtractText = async () => {
    try {
      if (extractTextState.isLoading || !extractTextState.imageBase64 || !extractTextState.image)
        return;

      updateExtractTextState({ isLoading: true });

      Toast.show({
        type: "info",
        text1: "Procesando imagen, no cierre esta ventana...",
        position: "top",
        text1Style: { fontSize: 14 },
      });

      const imageType = getImageType(extractTextState.image);

      const res = await processWithOCR(
        {
          imageBase64: extractTextState.imageBase64,
          imageType,
        },
        token
      );
      const data = await res.json();

      if (!res.ok || !data.recipe) {
        throw new Error(data.error || "No se pudo obtener información de la receta");
      }

      // update the recipe with the extracted text
      updateFormState({
        title: data.recipe.title ?? "",
        description: data.recipe.description ?? "",
        ingredients: data.recipe.ingredients ?? [],
        steps: data.recipe.steps ?? [],
        totalTime: data.recipe.totalTime ?? 0,
        categories: data.recipe.categories ?? [],
        image: extractTextState.image,
      });
      setImageBase64(extractTextState.imageBase64);

      Toast.show({
        type: "success",
        text1: "Se ha obtenido la información de la receta",
        position: "top",
        text1Style: { fontSize: 14 },
      });

      // close the bottom sheet
      bottomSheetRef.current.close();
    } catch (error) {
      updateExtractTextState({ image: null, imageBase64: null });

      const message =
        error?.message || "No se pudo extraer el texto de la imagen";
      Toast.show({
        type: "error",
        text1: "Error",
        text2: message,
        position: "top",
        text1Style: { fontSize: 14 },
      });
    } finally {
      updateExtractTextState({ isLoading: false });
    }
  };

  /* AI - New Recipe Option */
  const [newRecipeState, updateNewRecipeState] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    {
      isLoading: false,
      error: null,
      title: null,
      description: null,
    }
  );

  const handleNewRecipe = async () => {
    try {
      if (
        newRecipeState.isLoading ||
        !newRecipeState.title ||
        !newRecipeState.description
      )
        return;

      updateNewRecipeState({ isLoading: true });

      Toast.show({
        type: "info",
        text1: "Procesando texto, no cierre esta ventana...",
        position: "top",
        text1Style: { fontSize: 14 },
      });

      const res = await processWithNewIdea(
        {
          title: newRecipeState.title,
          description: newRecipeState.description,
        },
        token
      );
      const data = await res.json();

      if (!res.ok || !data.recipe) {
        throw new Error(data.error || "Error al crear la receta");
      }

      const newRecipe = data.recipe;
      
      updateFormState({
        title: newRecipe.title,
        description: newRecipe.description,
        ingredients: newRecipe.ingredients,
        steps: newRecipe.steps,
        totalSteps: newRecipe.totalSteps,
        categories: newRecipe.categories,
        totalTime: newRecipe.totalTime,
      });

      Toast.show({
        type: "success",
        text1: "Información de la receta creada",
        position: "top",
        text1Style: { fontSize: 14 },
      });

      // close the bottom sheet
      bottomSheetRef.current.close();
    } catch (error) {
      const message = error?.message || "No se pudo crear la receta";
      Toast.show({
        type: "error",
        text1: "Error",
        text2: message,
        position: "top",
        text1Style: { fontSize: 14 },
      });
    } finally {
      updateNewRecipeState({ isLoading: false });
    }
  };

  /* AI - From Photo Option */
  const [fromPhotoState, updateFromPhotoState] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    {
      isLoading: false,
      error: null,
      image: null,
      imageBase64: null,
    }
  );

  const handleFromPhoto = async () => {
    try {
      if (
        fromPhotoState.isLoading ||
        !fromPhotoState.imageBase64 ||
        !fromPhotoState.image
      )
        return;

      updateFromPhotoState({ isLoading: true });

      Toast.show({
        type: "info",
        text1: "Procesando imagen, no cierre esta ventana...",
        position: "top",
        text1Style: { fontSize: 14 },
      });

      const imageType = getImageType(fromPhotoState.image);

      const res = await processWithImage(
        {
          imageBase64: fromPhotoState.imageBase64,
          imageType,
        },
        token
      );
      const data = await res.json();

      if (!res.ok || !data.recipe) {
        throw new Error(data.error || "Error al extraer texto de la imagen");
      }

      // update the recipe with the extracted text
      updateFormState({
        title: data.recipe.title ?? "",
        description: data.recipe.description ?? "",
        ingredients: data.recipe.ingredients ?? [],
        steps: data.recipe.steps ?? [],
        totalTime: data.recipe.totalTime ?? 0,
        categories: data.recipe.categories ?? [],
        image: fromPhotoState.image,
      });
      setImageBase64(fromPhotoState.imageBase64);

      Toast.show({
        type: "success",
        text1: "Se ha obtenido la información de la receta",
        position: "top",
        text1Style: { fontSize: 14 },
      });

      // close the bottom sheet
      bottomSheetRef.current.close();
    } catch (error) {
      const message = error?.message || "No se pudo obtener la información de la receta";
      Toast.show({
        type: "error",
        text1: "Error",
        text2: message,
        position: "top",
        text1Style: { fontSize: 14 },
      });
    } finally {
      updateFromPhotoState({ isLoading: false });
    }
  };

  const isAIProcessLoading = extractTextState.isLoading || newRecipeState.isLoading || fromPhotoState.isLoading;

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
    isLoading,

    /* Bottom sheet */
    BottomSheetViews,
    BottomSheetConfig,
    bottomSheetRef,
    isAIProcessLoading,

    /* AI options - OCR */
    handleExtractText,
    extractTextState,
    updateExtractTextState,

    /* AI options - New Recipe */
    handleNewRecipe,
    newRecipeState,
    updateNewRecipeState,

    /* AI options - From Photo */
    handleFromPhoto,
    fromPhotoState,
    updateFromPhotoState,
  };
}
