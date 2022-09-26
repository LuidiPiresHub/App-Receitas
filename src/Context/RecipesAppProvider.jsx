import React, { useState } from 'react';
import propTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';

export default function RecipesAppProvider({ children }) {
  const [bool, setBool] = useState();
  const contextValue = {
    bool,
    setBool,
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
