import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import RecipesAppProvider from './Context/RecipesAppProvider';
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <RecipesAppProvider>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"
    />
    <script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js" />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecipesAppProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
