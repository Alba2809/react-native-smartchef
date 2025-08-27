import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useFavoriteStore = create()(
  persist(
    (set, get) => ({
      recipesFavorited: [],

      handleFavorite: async (recipeId, status) => {
        try {
          // add the recipe id to the favorites list if status is true
          // remove the recipe id from the favorites list if status is false
          if (status) {
            set({ recipesFavorited: [...get().recipesFavorited, recipeId] });
          } else {
            set({
              recipesFavorited: get().recipesFavorited.filter(
                (r) => r !== recipeId
              ),
            });
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
    {
      name: "recipesFavorited",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useFavoriteStore;
