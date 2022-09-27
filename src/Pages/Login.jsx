import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
    localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: {}, meals: {} }));
    history.push('/meals');
  };

  return (
    <form>
      <input
        type="email"
        name="email"
        value={ login.email }
        id="email"
        data-testid="email-input"
        onChange={ handleChange }
      />
      <input
        type="password"
        name="password"
        value={ login.password }
        id="password"
        data-testid="password-input"
        onChange={ handleChange }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ isDisabled }
        onClick={ onClickEnter }
      >
        Enter
      </button>
    </form>
  );
}
