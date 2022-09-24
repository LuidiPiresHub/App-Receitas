import React, { useContext } from 'react';
import RecipesAppContext from '../Context/RecipesAppContext';

export default function SearchBar() {
  const { bool } = useContext(RecipesAppContext);
  return (
    <form>
      { bool && (
        <input
          type="text"
          data-testid="search-input"
        />
      ) }
    </form>
  );
}
