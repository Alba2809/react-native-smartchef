import API_URL from "../constants/api";

export const getCategoriesRequest = async () =>
  fetch(`${API_URL}/category`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
