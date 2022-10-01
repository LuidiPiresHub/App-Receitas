import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import RecipesAppContext from '../Context/RecipesAppContext';
import '../styles/Header.css';

export default function SearchBar() {
  const { bool, setRadio, getApi, setSearchInputValue } = useContext(RecipesAppContext);
  return (
    <div>
      {bool && (
        <Form className="searchBarContainer">
          <Form.Group style={ { display: 'flex' } }>
            <Form.Control
              className="searchBar"
              type="text"
              data-testid="search-input"
              placeholder="Search"
              onChange={ ({ target: { value } }) => setSearchInputValue(value) }
            />
            <Button
              variant="dark"
              type="button"
              data-testid="exec-search-btn"
              onClick={ getApi }
            >
              <FontAwesomeIcon icon={ faSearch } />
            </Button>
          </Form.Group>
          <Form.Group className="radioContainer">
            <Form.Check
              type="radio"
              label="Ingredient"
              id="Ingredient"
              name="radio"
              value="Ingredient"
              defaultChecked
              data-testid="ingredient-search-radio"
              onChange={ ({ target: { value } }) => setRadio(value) }
            />
            <Form.Check
              type="radio"
              label="Name"
              id="Name"
              name="radio"
              value="Name"
              data-testid="name-search-radio"
              onChange={ ({ target: { value } }) => setRadio(value) }
            />
            <Form.Check
              type="radio"
              label="First Letter"
              id="First letter"
              name="radio"
              value="First letter"
              data-testid="first-letter-search-radio"
              onChange={ ({ target: { value } }) => setRadio(value) }
            />
          </Form.Group>
        </Form>
      )}
    </div>
  );
}
