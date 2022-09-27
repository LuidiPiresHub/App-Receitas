import React from 'react';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar';
import CardRecipes from '../Components/CardRecipes';
import Footer from '../Components/Footer';

export default function Recipes() {
  return (
    <div>
      <Header />
      <SearchBar />
      <CardRecipes />
      <Footer />
    </div>
  );
}
