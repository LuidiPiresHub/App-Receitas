export const fetchApiMeals = async (id) => {
  const fromApi = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((response) => response.json().then((data) => data));
  return fromApi;
};

export const fetchApiDrinks = async (id) => {
  const fromApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`).then((response) => response.json().then((data) => data));
  return fromApi;
};
