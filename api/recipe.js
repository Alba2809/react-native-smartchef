import API_URL from "../constants/api";

export const createRecipe = async (data, token) =>
  fetch(`${API_URL}/recipe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

export const getFavoritesRequest = async (token) =>
  fetch(`${API_URL}/recipe/favorites`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const getRecipeRequest = async (token, recipeId) =>
  fetch(`${API_URL}/recipe/${recipeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
