import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useSettingsStore = create()(
  persist(
    (set, get) => ({
      narrationWithDuration: true,

      setNarrationWithDuration: (value) =>
        set({ narrationWithDuration: value }),
    }),
    {
      name: "app-settings",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useSettingsStore;