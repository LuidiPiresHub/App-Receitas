import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import Favorite from '../Components/Favorite';
import { fetchApiDrinks, fetchApiMeals } from '../Services/api';
import '../styles/RecipesDetails.css';

export default function RecipeInProgress({ location: { pathname }, location }) {
  const { id } = useParams();
  const [returnFetch, setReturnFetch] = useState([]);
  const [bool, setBool] = useState(true);
  const [call, setCall] = useState(false);
  const [ingredientsValue, setIngredientsValue] = useState([]);
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
      <main className="recipeDetailsContainer">
        <Card style={ { border: 'none' } }>
          <Card.Img
            className="cardImage"
            src={ returnFetch[0][`str${foodType}Thumb`] }
            alt={ `${foodType}_img` }
            data-testid="recipe-photo"
          />
          <Card.ImgOverlay className="overlay" style={ { padding: '0' } }>
            <Card.Header
              style={ { borderRadius: '0', color: '#f6f6f6', backgroundColor: '#161616',
              } }
              className="cardHeader"
            >
              {foodType === 'Meal' ? (
                <Card.Text
                  className="recipeCategory"
                  data-testid="recipe-category"
                >
                  <h2>{returnFetch[0].strCategory}</h2>
                </Card.Text>
              ) : (
                <Card.Text
                  className="recipeCategory"
                  data-testid="recipe-category"
                >
                  <h2>{returnFetch[0].strAlcoholic}</h2>
                </Card.Text>
              )}
              <Favorite location={ location } returnFetch={ returnFetch } />
            </Card.Header>
            <Card.Title
              data-testid="recipe-title"
              className="cardTitle"
              style={ { fontSize: '24px', fontWeight: '800', margin: 'auto',
              } }
            >
              <p>
                {foodType === 'Meal'
                  ? returnFetch[0].strMeal
                  : returnFetch[0].strMeal}
              </p>
            </Card.Title>
          </Card.ImgOverlay>
        </Card>
        <hr />
        <section className="ingredientsContainer">
          <ul>
            { ingredientsMeasures.map((ingredient, index) => {
              const logic = ingredientsValue.some((i) => i === ingredient);
              return (
                <label
                  key={ index }
                  className="checkBoxContainer"
                  data-testid={ `${index}-ingredient-step` }
                  htmlFor={ index }
                >
                  <input
                    value={ ingredient }
                    type="checkbox"
                    key={ `${ingredient}-${index}` }
                    id={ index }
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
              );
            })}
          </ul>
        </section>
        <hr />
        <article data-testid="instructions">{returnFetch[0].strInstructions}</article>
        <hr />
        {foodType === 'Meal' ? (
          <div style={ { width: '100vw', overflowX: 'hidden' } }>
            <iframe
              title={ `${foodType}-Preparation` }
              width="420"
              height="315"
              allowFullScreen
              data-testid="video"
              src={ returnFetch[0].strYoutube.replace('watch?v=', 'embed/') }
            />
          </div>
        ) : (
          ''
        )}
        <Button
          style={ { borderRadius: '0' } }
          variant="dark"
          data-testid="finish-recipe-btn"
          disabled={ bool }
          onClick={ () => history.push('/done-recipes') }
        >
          FINISH RECIPE
        </Button>
      </main>
    );
  }
  return <div />;
}

RecipeInProgress.propTypes = {
  location: PropTypes.shape().isRequired,
};
