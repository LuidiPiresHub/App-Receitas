import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlateUtensils } from '@fortawesome/sharp-solid-svg-icons';
import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import '../styles/Login.css';

const MAX_LENGTH_PASSWORD = 6;

export default function Login() {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setLogin((prevState) => ({ ...prevState, [name]: value }));
    const format = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let isEmailValid = false;
    if (login.email.match(format)) {
      isEmailValid = true;
    } else {
      isEmailValid = false;
    }
    if (login.password.length >= MAX_LENGTH_PASSWORD && isEmailValid) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const onClickEnter = () => {
    const { email } = login;
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('drinksToken', 1);
    localStorage.setItem('doneRecipes', JSON.stringify([]));
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ drinks: {}, meals: {} }),
    );
    history.push('/meals');
  };

  return (
    <div className="bgStyles">
      <FontAwesomeIcon icon={ faPlateUtensils } />
      <h1>Login to continue:</h1>
      <Container className="containerStyles">
        <Form className="formStyles">
          <Form.Group style={ { marginBottom: '10px' } }>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={ login.email }
              id="email"
              placeholder="Your email:"
              data-testid="email-input"
              onChange={ handleChange }
            />
          </Form.Group>
          <Form.Group style={ { marginBottom: '20px' } }>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={ login.password }
              id="password"
              placeholder="Your password:"
              data-testid="password-input"
              onChange={ handleChange }
            />
          </Form.Group>
          <Button
            type="button"
            variant="dark"
            data-testid="login-submit-btn"
            disabled={ isDisabled }
            onClick={ onClickEnter }
          >
            Enter
          </Button>
        </Form>
      </Container>
    </div>
  );
}
