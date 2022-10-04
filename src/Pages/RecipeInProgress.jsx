import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Favorite from '../Components/Favorite';
import { fetchApiDrinks, fetchApiMeals } from '../Services/api';
// import './style.css';

export default function RecipeInProgress({ location: { pathname }, location }) {
  const { id } = useParams();
  const [returnFetch, setReturnFetch] = useState([]);
  // const [storageReturn, setStorageReturn] = useState([]);
  const [bool, setBool] = useState(true);
  const [call, setCall] = useState(false);
  const [ingredientsValue, setIngredientsValue] = useState([]);
  // const [checkboxInput, setCheckedInput] = useState([]);
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
      if (
        measures[index][1] !== null
        && ingredients[index][1] !== null
        && measures[index][1] !== ''
        && ingredients[index][1] !== ''
      ) {
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
      const foodArray = local[translate[whatFood(pathname)]][id] || [];
      setIngredientsValue(foodArray);
      // setStorageReturn(foodArray);
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
    // renderCheckboxFromStorage();
  }, [call, returnFetch]);

  useEffect(() => {
    callingFetch();
    renderCheckboxFromStorage();
  }, []);

  const foodType = whatFood(pathname);

  const addInProgressMeals = (idFood, value) => {
    const food = translate[whatFood(pathname)];
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        drinks: {},
        meals: {},
      }));
    }
    const saved = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const toMeals = {
      drinks: { ...saved.drinks },
      meals: { ...saved.meals, [idFood]: [...ingredientsValue, value] },
    };
    const toDrinks = {
      drinks: { ...saved.drinks, [idFood]: [...ingredientsValue, value] },
      meals: { ...saved.meals },
    };
    if (food === 'meals') {
      localStorage.setItem('inProgressRecipes', JSON.stringify(toMeals));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify(toDrinks));
    }
  };

  const handleCheckbox = (target, ingredientId, ingredient) => {
    const { checked, nextSibling, value } = target;
    addInProgressMeals(ingredientId, ingredient);
    if (checked) {
      nextSibling.style.textDecoration = 'line-through';
    } else {
      nextSibling.style.textDecoration = '';
    }
    if (!ingredientsValue.includes(value)) {
      setIngredientsValue((prevState) => [...prevState, value]);
    } else {
      ingredientsValue.splice(ingredientsValue.indexOf(value), 1);
    }
    renderCheckboxFromStorage();
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
          {foodType === 'Meal' ? (
            <h3 data-testid="recipe-category">{returnFetch[0].strCategory}</h3>
          ) : (
            <h3 data-testid="recipe-category">{returnFetch[0].strAlcoholic}</h3>
          )}
          <section>
            { ingredientsMeasures.map((ingredient, index) => {
              const logic = ingredientsValue.some((i) => i === ingredient);
              // || ingredientsValue.includes(ingredient);
              // const isChecked = logic ? 'checked' : '';
              return (
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
                      // defaultChecked={ logic }
                      checked={ logic }
                      onChange={ ({ target }) => {
                        handleCheckbox(
                          target,
                          returnFetch[0][`id${foodType}`],
                          ingredient,
                        );
                        setCall(!call);
                      } }
                    />
                    <p
                      style={ {
                        textDecoration: ingredientsValue.includes(ingredient)
                          ? 'line-through'
                          : '',
                      } }
                    >
                      {ingredient}
                    </p>
                  </label>
                </div>
              );
            })}
          </section>
          <p data-testid="instructions">{returnFetch[0].strInstructions}</p>
          {foodType === 'Meal' ? (
            <iframe
              title={ `${foodType}-Preparation` }
              width="420"
              height="315"
              allowFullScreen
              data-testid="video"
              src={ returnFetch[0].strYoutube.replace('watch?v=', 'embed/') }
            />
          ) : (
            ''
          )}
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
  return <div />;
}

RecipeInProgress.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
