import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import '../styles/Profile.css';

export default function Profile() {
  const [userEmail, setUserEmail] = useState('');
  const local = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (local) {
      const { email } = local;
      setUserEmail(email);
    }
  }, [local]);

  const history = useHistory();

  const handleLogoutButton = () => {
    history.push('/');
    localStorage.clear();
  };

  return (
    <div>
      <Header />
      <section className="profile-section">
        <Card
          style={ { width: '20rem', justifyContent: 'center', padding: '5px' } }
        >
          <Card.Img variant="top" width="250px" height="250px" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
          <Card.Title data-testid="profile-email">{userEmail}</Card.Title>
          <Button
            style={ { backgroundColor: '#d01919' } }
            type="button"
            variant="danger"
            data-testid="profile-done-btn"
            onClick={ () => history.push('/done-recipes') }
          >
            Done Recipes
          </Button>
          <Button
            style={ { backgroundColor: '#d01919' } }
            type="button"
            variant="danger"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
          >
            Favorite Recipes
          </Button>
          <Button
            style={ { backgroundColor: '#d01919' } }
            type="button"
            variant="danger"
            data-testid="profile-logout-btn"
            onClick={ handleLogoutButton }
          >
            Logout
          </Button>
        </Card>
      </section>
      <Footer />
    </div>
  );
}
