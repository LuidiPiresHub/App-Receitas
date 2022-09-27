import React, { useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesAppContext from './RecipesAppContext';
import fetchApi from '../Services/api';

export default function RecipesAppProvider({ children }) {
  const [bool, setBool] = useState();
  const [radio, setRadio] = useState('Ingredient');
  const [searchInputValue, setSearchInputValue] = useState('');
  const [arrayCardRecipes, setArrayCardRecipes] = useState([]);
  const history = useHistory();

  const getApi = async () => {
    const { location: { pathname } } = history;
    const componentName = pathname.replace('/', '');

    const itemId = {
      drinks: 'idDrink',
      meals: 'idMeal',
    };

    if (searchInputValue.length > 1 && radio === 'First letter') {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const resultApi = await fetchApi(radio, searchInputValue, componentName);
      const arrayItems = resultApi[componentName];
      if (arrayItems !== null) {
        if (arrayItems.length === 1) {
          const itemToDetail = arrayItems.map((item) => item[itemId[componentName]]);
          history.push(`${componentName}/${itemToDetail[0]}`);
        } else {
          setArrayCardRecipes(arrayItems);
        }
      } else {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    }
  };

  const contextValue = {
    bool,
    setBool,
    radio,
    setRadio,
    getApi,
    setSearchInputValue,
    arrayCardRecipes,
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
