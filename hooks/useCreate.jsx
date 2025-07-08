import { useCallback, useReducer, useRef, useState } from "react";
import Toast from "react-native-toast-message";
import StepInput from "../components/StepInput";
import StepsList from "../components/StepsList";
import IngredientInput from "../components/IngredientInput";
import IngredientsList from "../components/IngredientsList";
import CategoryPicker from "../components/CategoryPicker";

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
  const [imageBase64, setImageBase64] = useState(null);
  const filds = {
    TITLE: "title",
    DESCRIPTION: "description",
    IMAGE: "image",
    TOTAL_TIME: "totalTime",
  }

  /* Bottom sheet */
  const bottomSheetRef = useRef(null);

  /*  */
  const [status, setStatus] = useState(STATUS_OPTIONS.PRIVATE);

  const handleSubmit = async () => {};

  const handlePreview = async () => {};

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
  }

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
    BottomSheetConfig
  };
}
