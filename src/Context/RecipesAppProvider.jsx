import React, { useState } from 'react';
import propTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';

const INITIAL_STATE = { nome: 'Xablau', idade: 100 };

export default function RecipesAppProvider({ children }) {
  const [state, setState] = useState(INITIAL_STATE);
  return (
    <RecipesAppContext.Provider value={ state }>
      {children}
    </RecipesAppContext.Provider>
  );
}

RecipesAppProvider.propTypes = {
  children: propTypes.node.isRequired,
};
