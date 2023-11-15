const formatDate = (d) => {
  const date = new Date(d);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    fractionalDigits: 7
  };
  const formattedDate = date.toLocaleString("en-US", options);
  return formattedDate;
};

const saveValueToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getItemFromLocalStorage = (key) => localStorage.getItem(key);

const removeItemFromLocalStorage = (key) => localStorage.removeItem(key);

export { formatDate, saveValueToLocalStorage, getItemFromLocalStorage, removeItemFromLocalStorage };
