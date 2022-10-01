import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Favorite from '../Components/Favorite';
import { fetchApiDrinks, fetchApiMeals } from '../Services/api';
// import './style.css';

export default function RecipeInProgress({ location: { pathname }, location }) {
  const { id } = useParams();
  const [returnFetch, setReturnFetch] = useState([]);
  const [storageReturn, setStorageReturn] = useState([]);
  const [bool, setBool] = useState(true);
  const [call, setCall] = useState(false);
  const history = useHistory();

  const whatFood = (urlPath) => {
    if (urlPath.includes('meals')) {
      return 'Meal';
    }
    return 'Drink';
  };

  const translate = {
    Meal: 'meals',
    Drink: 'drinks',
  };

  const getIngredientsAndMeasures = (object) => {
    const entries = Object.entries(object[0]);
    const newArr = [];
    const measures = entries.filter((entry) => entry[0].includes('strMeasure'));
    const ingredients = entries.filter((entry) => entry[0].includes('strIngredient'));
    measures.forEach((_, index) => {
      if (measures[index][1] !== null
        && ingredients[index][1] !== null
        && measures[index][1] !== ''
        && ingredients[index][1] !== '') {
        newArr.push(`${measures[index][1]} - ${ingredients[index][1]}`);
      }
    });
    return newArr;
  };

  const callingFetch = async () => {
    if (pathname.includes('meals')) {
      const resultMeals = await fetchApiMeals(id);
      setReturnFetch(resultMeals);
    } else if (pathname.includes('drinks')) {
      const resultDrinks = await fetchApiDrinks(id);
      setReturnFetch(resultDrinks);
    }
  };

  const renderCheckboxFromStorage = () => {
    const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (local) {
      const foodArray = local[translate[whatFood(pathname)]][id];
      if (foodArray) {
        setStorageReturn(foodArray);
      }
    }
  };

  useEffect(() => {
    const handleInputs = () => {
      const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (local) {
        const localStorageIds = local[translate[whatFood(pathname)]][id];
        const bools = [true];
        if (localStorageIds && returnFetch.length > 0) {
          const ingrediesntLength = getIngredientsAndMeasures(returnFetch).length;
          bools.push(localStorageIds.length !== ingrediesntLength);
        }
        setBool(() => bools.every((falsy) => falsy));
      }
    };
    handleInputs();
  }, [call, returnFetch]);

  useEffect(() => {
    callingFetch();
    renderCheckboxFromStorage();
  }, [pathname]);

  const foodType = whatFood(pathname);

  const handleStorage = (ingredientId, ingredient) => {
    const food = translate[whatFood(pathname)];
    const foodStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (foodStorage) {
      if (Object.entries(foodStorage[food]).length > 0
      && foodStorage[food][ingredientId] !== undefined) {
        let allIngredients = foodStorage[food][ingredientId];
        const exists = allIngredients.includes(ingredient);
        if (exists) {
          allIngredients.splice(allIngredients.indexOf(ingredient), 1);
          foodStorage[food][ingredientId] = allIngredients;
          if (foodStorage[food][ingredientId].length === 0) {
            delete foodStorage[food][ingredientId];
          }
        } else {
          allIngredients = [...allIngredients, ingredient];
          foodStorage[food][ingredientId] = allIngredients;
        }
      } else {
        const ingredientObj = {
          ...foodStorage[food],
          [ingredientId]: [ingredient],
        };
        foodStorage[food] = ingredientObj;
      }
      localStorage.setItem('inProgressRecipes', JSON.stringify(foodStorage));
    }
  };

  const handleCheckbox = (target, ingredientId, ingredient) => {
    const { checked, nextSibling } = target;
    handleStorage(ingredientId, ingredient);
    if (checked) {
      nextSibling.style.textDecoration = 'line-through';
    } else {
      nextSibling.style.textDecoration = '';
    }
  };

  if (returnFetch.length > 0) {
    const ingredientsMeasures = getIngredientsAndMeasures(returnFetch);
    return (
      <main>
        <header>{foodType}</header>
        <Favorite location={ location } returnFetch={ returnFetch } />
        <section>
          <h1 data-testid="recipe-title">{returnFetch[0][`str${foodType}`]}</h1>
          <img
            src={ returnFetch[0][`str${foodType}Thumb`] }
            alt={ `${foodType}_img` }
            data-testid="recipe-photo"
            width="300px"
            height="300px"
          />
          {foodType === 'Meal'
            ? <h3 data-testid="recipe-category">{returnFetch[0].strCategory}</h3>
            : <h3 data-testid="recipe-category">{returnFetch[0].strAlcoholic}</h3>}
          <section>
            {ingredientsMeasures.map((ingredient, index) => (
              <div key={ index }>
                <label
                  className="checkBoxContainer"
                  data-testid={ `${index}-ingredient-step` }
                  htmlFor={ index }
                >
                  <input
                    value={ ingredient }
                    type="checkbox"
                    key={ `${ingredient}-${index}` }
                    id={ index }
                    defaultChecked={ storageReturn.includes(ingredient) }
                    // checked={ storageReturn.includes(ingredient) }
                    onChange={ ({ target }) => {
                      handleCheckbox(target, returnFetch[0][`id${foodType}`], ingredient);
                      setCall(!call);
                    } }
                  />
                  <p
                    style={
                      { textDecoration:
                         storageReturn.includes(ingredient) ? 'line-through' : '' }
                    }
                  >
                    {ingredient}
                  </p>
                </label>
              </div>
            ))}
          </section>
          <p data-testid="instructions">{returnFetch[0].strInstructions}</p>
          { foodType === 'Meal' ? <iframe
            title={ `${foodType}-Preparation` }
            width="420"
            height="315"
            allowFullScreen
            data-testid="video"
            src={ returnFetch[0].strYoutube.replace('watch?v=', 'embed/') }
          /> : '' }
        </section>
        <section>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ bool }
            onClick={ () => history.push('/done-recipes') }
          >
            FINISH RECIPE
          </button>
        </section>
      </main>
    );
  }
  return (
    <div />
  );
}

RecipeInProgress.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
