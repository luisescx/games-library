import { add } from "date-fns";

export const formatDate = (dateString: string) => {
  const dateObject = new Date(dateString);

  const formattedDate = dateObject.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formattedDate;
};

export const getDateFromTodayIsoString = (days: number) => {
  const currentDate = new Date();

  const addedDate = add(currentDate, { days });
  return addedDate.toISOString();
};

export const getExpiryTimestamp = (hours: number) => {
  const currentDate = new Date();
  const expiryDate = add(currentDate, { hours });
  return expiryDate.toISOString();
};
