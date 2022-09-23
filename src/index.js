import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import RecipesAppProvider from './Context/RecipesAppProvider';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <RecipesAppProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecipesAppProvider>,
  (document.getElementById('root')),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
