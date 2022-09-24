import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Helpers/renderWithRouter';

describe('Tests on Header component', () => {
  it('should be rendered icons profile, search and the page title', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.getByTestId('search-top-btn');
    const pageTitle = screen.getByTestId('page-title');
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });

  it('should be rendered Profile page when button has been clicked ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    const userButton = screen.getByTestId('profileBtn');
    expect(userButton).toBeInTheDocument();
    userEvent.click(userButton);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/profile');
  });

  it('should be rendered input button when button has been clicked', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./drinks');
    const searchButton = screen.getByTestId('search-top-btn');
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    userEvent.click(searchButton);
    expect(searchInput).not.toBeInTheDocument();
  });
});
