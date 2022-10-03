import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function Profile() {
  const [userEmail, setUserEmail] = useState('');
  const local = JSON.parse(localStorage.getItem('user'));
  if (local) {
    const { email } = local;
    setUserEmail(email);
  }
  const history = useHistory();

  const handleLogoutButton = () => {
    history.push('/');
    localStorage.clear();
  };

  return (
    <div>
      <Header />
      <section>
        <h3 data-testid="profile-email">{userEmail}</h3>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleLogoutButton }
        >
          Logout
        </button>
      </section>
      <Footer />
    </div>
  );
}
