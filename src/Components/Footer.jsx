import React from 'react';
import { useHistory } from 'react-router-dom';
import { faGlassMartiniAlt } from '@fortawesome/sharp-solid-svg-icons';
import '../styles/Footer.css';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      >
        <FontAwesomeIcon icon={ faGlassMartiniAlt } />
      </button>
      <button
        type="button"
        data-testid="meals-bottom-btn"
        onClick={ onClickMeals }
      >
        <FontAwesomeIcon icon={ faUtensils } />
      </button>
    </section>
  );
}
