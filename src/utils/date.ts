export const formatDate = (dateString: string) => {
  const dateObject = new Date(dateString);

  const formattedDate = dateObject.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formattedDate;
};
