import API_URL from "../constants/api";

export const getFavoritesRequest = async ({ token, title, categories }) => {
  const params = new URLSearchParams({
    title: title,
  });

  categories.forEach((category, index) => {
    params.append("categories", category);
  });

  return fetch(`${API_URL}/favorite?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createDeleteFavorite = async (token, recipeId) =>
  fetch(`${API_URL}/favorite/${recipeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
