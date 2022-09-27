export const fetchApiMeals = async (id) => {
  try {
    const fromApi = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((response) => response.json().then((data) => data.meals));
    return fromApi;
  } catch (err) {
    return [];
  }
};

export const fetchApiDrinks = async (id) => {
  try {
    const fromApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`).then((response) => response.json().then((data) => data.drinks));
    return fromApi;
  } catch (err) {
    return [];
  }
};
