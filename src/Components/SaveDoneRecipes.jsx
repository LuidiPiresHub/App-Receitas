const generateDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const actualDate = `${day}/${month}/${year}`;
  return actualDate;
};

const generateTags = (string) => string && string.split(',');

const generateObject = (returnFetch, pathname) => {
  if (returnFetch.length !== 0) {
    const doneRecipes = {
      id: returnFetch[0]?.idMeal || returnFetch[0]?.idDrink,
      type: pathname.includes('meals') ? 'meal' : 'drink',
      nationality: returnFetch[0]?.strArea || '',
      category: returnFetch[0]?.strCategory,
      alcoholicOrNot: returnFetch[0]?.strAlcoholic || '',
      name: returnFetch[0]?.strMeal || returnFetch[0]?.strDrink,
      image: returnFetch[0]?.strMealThumb || returnFetch[0]?.strDrinkThumb,
      doneDate: generateDate(),
      tags: generateTags(returnFetch[0]?.strTags) || [],
    };
    return doneRecipes;
  }
};

const saveRecipesOnLocalStorage = (returnFetch, pathname) => {
  const local = JSON.parse(localStorage.getItem('doneRecipes'));
  const newRecipe = generateObject(returnFetch, pathname);
  if (local.length > 0) {
    local.forEach((element) => {
      if (element.id === newRecipe.id) {
        local.splice(local.indexOf(newRecipe.id), 1);
        localStorage.setItem('doneRecipes', JSON.stringify([...local, newRecipe]));
      } else {
        localStorage.setItem('doneRecipes', JSON.stringify([...local, newRecipe]));
      }
    });
  }
};

export default saveRecipesOnLocalStorage;
