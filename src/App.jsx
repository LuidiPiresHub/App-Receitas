import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Recipes from './Pages/Recipes';
import RecipeDetails from './Components/RecipeDetails';
import RecipeInProgress from './Pages/RecipeInProgress';
import Profile from './Pages/Profile';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import NotFound from './Components/NotFound';
import RecipesAppProvider from './Context/RecipesAppProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <RecipesAppProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" render={ (props) => <Recipes { ...props } /> } />
        <Route exact path="/drinks" render={ (props) => <Recipes { ...props } /> } />
        <Route
          exact
          path="/meals/:id"
          render={ (props) => <RecipeDetails { ...props } /> }
        />
        <Route
          exact
          path="/drinks/:id"
          render={ (props) => <RecipeDetails { ...props } /> }
        />
        <Route
          exact
          path="/meals/:id/in-progress"
          render={ (props) => <RecipeInProgress { ...props } /> }
        />
        <Route
          exact
          path="/drinks/:id/in-progress"
          render={ (props) => <RecipeInProgress { ...props } /> }
        />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/" component={ NotFound } />
      </Switch>
    </RecipesAppProvider>
  );
}

export default App;
