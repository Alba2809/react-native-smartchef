import API_URL from "../constants/api";

export const processWithOCR = async (data, token) =>
  fetch(`${API_URL}/ai/ocr`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

export const processWithNewIdea = async (data, token) =>
  fetch(`${API_URL}/ai/newidea`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

export const processWithImage = async (data, token) =>
  fetch(`${API_URL}/ai/withimage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
