import React, { useContext } from 'react';
import RecipesAppContext from '../Context/RecipesAppContext';

export default function SearchBar() {
  const { bool, setRadio, getApi, setSearchInputValue } = useContext(RecipesAppContext);
  return (
    <form>
      {bool && (
        <section>
          <input
            type="text"
            data-testid="search-input"
            placeholder="Search"
            onChange={ ({ target: { value } }) => setSearchInputValue(value) }
          />
          <div>
            <label htmlFor="Ingredient">
              <input
                type="radio"
                id="Ingredient"
                name="radio"
                value="Ingredient"
                data-testid="ingredient-search-radio"
                onChange={ ({ target: { value } }) => setRadio(value) }
              />
              Ingredient
            </label>
            <label htmlFor="Name">
              <input
                type="radio"
                id="Name"
                name="radio"
                value="Name"
                data-testid="name-search-radio"
                onChange={ ({ target: { value } }) => setRadio(value) }
              />
              Name
            </label>
            <label htmlFor="First letter">
              <input
                type="radio"
                id="First letter"
                name="radio"
                value="First letter"
                data-testid="first-letter-search-radio"
                onChange={ ({ target: { value } }) => setRadio(value) }
              />
              First letter
            </label>
          </div>
          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ getApi }
          >
            SEARCH
          </button>
        </section>
      )}
    </form>
  );
}
