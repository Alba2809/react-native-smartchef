import API_URL from "../constants/api";

export const getFavoritesRequest = async (token) =>
  fetch(`${API_URL}/favorite`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const createDeleteFavorite = async (token, recipeId) =>
  fetch(`${API_URL}/favorite/${recipeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
