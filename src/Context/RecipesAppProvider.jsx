import React, { useState } from 'react';
import propTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';

export default function RecipesAppProvider({ children }) {
  const [bool, setBool] = useState();
  const [doneRecipes, setDoneRecipes] = useState();
  const [recipesInProgress, setRecipesInProgress] = useState();
  const contextValue = {
    bool,
    setBool,
    doneRecipes,
    setDoneRecipes,
    recipesInProgress,
    setRecipesInProgress,
  };

  return (
    <RecipesAppContext.Provider value={ contextValue }>
      {children}
    </RecipesAppContext.Provider>
  );
}

RecipesAppProvider.propTypes = {
  children: propTypes.node.isRequired,
};
