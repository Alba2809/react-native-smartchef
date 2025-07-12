import { create } from "zustand";
import { getCategoriesRequest } from "../api/category";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useCategoryStore = create((set) => ({
  categories: [],

  getCategories: async () => {
    try {
      const res = await getCategoriesRequest();

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