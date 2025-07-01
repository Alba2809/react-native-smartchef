import { useRef, useState } from "react";
import useAuthStore from "../store/authStore";
import { Animated } from "react-native";

const FILTER_OPTIONS = {
  ALL: "Todas",
  SAVED: "Guardadas",
  MY_RECIPES: "Mis recetas",
};

/**
 * @returns {{
 *   user: any,
 *   baseFilter: string,
 *   setBaseFilter: function,
 *   FILTER_OPTIONS: { ALL: string, SAVED: string, MY_RECIPES: string }
 * }}
 */
export default function useHome() {
  const { user } = useAuthStore();
  const [baseFilter, setBaseFilter] = useState(FILTER_OPTIONS.ALL);
  
  /* const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 64);
  const headerTranslateY = diffClamp.interpolate({
    inputRange: [0, 64],
    outputRange: [0, -64],
  }); */

  
  return {
    user,

    /* Base filter tags */
    baseFilter,
    setBaseFilter,
    FILTER_OPTIONS

    /* Animated scroll and hide */
    /* scrollY,
    headerTranslateY */
  };
}