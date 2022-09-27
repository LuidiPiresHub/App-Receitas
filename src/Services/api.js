const fetchApi = async (path, ingredient, componentName) => {
  try {
    const translate = {
      Ingredient: '/filter.php?i=',
      Name: '/search.php?s=',
      'First letter': '/search.php?f=',
      meals: 'themealdb',
      drinks: 'thecocktaildb',
    };

    const URL = `https://www.${translate[componentName]}.com/api/json/v1/1${translate[path]}${ingredient}`;
    const response = await fetch(URL);
    const result = await response.json();
    return result;
  } catch (error) {
    return { drinks: null };
  }
};
export default fetchApi;
