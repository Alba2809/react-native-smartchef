export const largeDateFormat = (dateString) => {
  const date = new Date(dateString);

  const formatted = date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formatted;
};

export const smallDateFormat = (dateString) => {
  const date = new Date(dateString);

  const formatted = date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return formatted;
};
