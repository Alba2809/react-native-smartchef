import { create } from "zustand";
import { loginRequest, registerRequest } from "../api/auth";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,

  register: async (username, email, password) => {
    set({ isLoading: true });

    try {
      const res = await registerRequest({
        username,
        email,
        password,
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.formErrors) {
          return { success: false, error: data.formErrors };
        }

        throw new Error(data.error || "Error al registrar");
      }

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      set({ token: data.token, user: data.user });

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (email, password) => {
    try {
      set({ isLoading: true });
      const res = await loginRequest({
        email,
        password,
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.formErrors) {
          return { success: false, error: data.formErrors };
        }

        throw new Error(data.error || "Error al registrar");
      }

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      /* Save the token expiration date */
      const decoded = jwtDecode(data.token);
      const expiration = decoded.exp * 1000;
      await AsyncStorage.setItem("token_expiration", expiration.toString());

      set({ token: data.token, user: data.user });

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("token_expiration");

      // set({ token: null, user: null });
    } catch (error) {
      console.log(error);
    }
  },

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");
      const user = userJson ? JSON.parse(userJson) : null;
      const expiration = await AsyncStorage.getItem("token_expiration");
      const now = Date.now();

      if (expiration && now > parseInt(expiration)) {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("token_expiration");
        set({ token: null, user: null });
      } else {
        set({ token, user });
      }
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useAuthStore;
