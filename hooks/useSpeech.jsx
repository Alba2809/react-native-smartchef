import { units } from "../utils/ingredients";
import * as Speech from "expo-speech";
import useSettingsStore from "../store/settingsStore";
import Toast from "react-native-toast-message";

export default function useSpeech() {
  const { narrationWithDuration } = useSettingsStore();

  const speakText = (text) => {
    return new Promise((resolve) => {
      Speech.speak(text, {
        language: "es-MX",
        pitch: 1,
        rate: 1,
        onDone: resolve,
        onStopped: resolve,
        onError: resolve,
      });
    });
  };

  // read full recipe
  const speakFullRecipe = async (recipe) => {
    await speakBasicInfo(recipe.title, recipe.description);

    if (recipe.ingredients?.length) {
      await speakIngredients(recipe.ingredients);
    }

    if (recipe.steps?.length) {
      await speakSteps(recipe.steps);
    }
  };

  // read basic info (title, description)
  const speakBasicInfo = async (title, description) => {
    try {
      await speakText(`Receta: ${title}`);
      if (description) await speakText(description);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo leer la receta",
        position: "top",
        text1Style: { fontSize: 14 },
      });
    }
  };

  // read only ingredients
  const speakIngredients = async (ingredients) => {
    try {
      await speakText("Ingredientes:");
      for (const ing of ingredients) {
        // find unit label
        const unit = units.find((u) => u.value === ing.unit)?.label || ing.unit;

        // build message
        const msg = `${ing.amount} ${unit} de ${ing.name}`;

        await speakText(msg);
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo leer los ingredientes",
        position: "top",
        text1Style: { fontSize: 14 },
      });
    }
  };

  // read only steps
  const speakSteps = async (steps) => {
    try {
      await speakText("Pasos de preparación:");
      for (const step of steps) {
        await speakStep(step);
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo leer los pasos",
        position: "top",
        text1Style: { fontSize: 14 },
      });
    }
  };

  // read a single step
  const speakStep = async (step) => {
    try {
      await speakText(`Paso ${step.number}: ${step.text}`);
      if (narrationWithDuration && step.duration) {
        await new Promise((res) => setTimeout(res, step.duration * 60 * 1000));
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo leer el paso",
        position: "top",
        text1Style: { fontSize: 14 },
      });
    }
  };

  // Controls
  const pause = () => Speech.pause();
  const resume = () => Speech.resume();
  const stop = () => Speech.stop();

  return {
    speakFullRecipe,
    speakBasicInfo,
    speakIngredients,
    speakSteps,
    speakStep,
    pause,
    resume,
    stop,
  };
}
