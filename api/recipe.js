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

export const getRecipeRequest = async (token, recipeId) =>
  fetch(`${API_URL}/recipe/${recipeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const getRecipesRequest = async ({
  token,
  page = 1,
  limit = 10,
  title = "",
  categories = [],
}) => {
  const params = new URLSearchParams({
    page: page,
    limit: limit,
    title: title,
  });

  categories.forEach((category, index) => {
    params.append("categories", category);
  });

  return fetch(`${API_URL}/recipe?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
