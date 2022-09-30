export const getItemByKey = (key) => {
  if (!JSON.parse(localStorage.getItem(key))) {
    localStorage.setItem(key, JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem(key));
};

export const setlocalstorage = (key, value) => localStorage
  .setItem(key, JSON.stringify(value));
