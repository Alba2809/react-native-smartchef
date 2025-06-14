import { create } from "zustand";
import API_URL from "../constants/apiUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useCategoryStore = create((set) => ({
  categories: [],

  getCategories: async () => {
    try {
      const res = await fetch(`${API_URL}/category`);

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al obtener las categorías");
      }

      await AsyncStorage.setItem("categories", JSON.stringify(data.categories));

      set({ categories: data.categories });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useCategoryStore;