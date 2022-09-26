import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  const history = useHistory();

  const onClickDrinks = () => {
    history.push('/drinks');
  };

  const onClickMeals = () => {
    history.push('/meals');
  };

  return (
    <section data-testid="footer" className="footer">
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        onClick={ onClickDrinks }
        src={ drinkIcon }
      >
        <img src={ drinkIcon } alt="" />
      </button>
      <button
        type="button"
        data-testid="meals-bottom-btn"
        onClick={ onClickMeals }
        src={ mealIcon }
      >
        <img src={ mealIcon } alt="" />
      </button>
    </section>
  );
}
