// import { waitFor } from '@testing-library/react';
// import mockDataMeals from './Mocks/mealsMock';
// import mockDataDrinks from './Mocks/drinksMock';

// const mealsURL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52882';
// const drinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17256';

// const mealsBrokenURL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=xablau';
// const drinksBrokenURL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=xablau';

// const brokenMeal = { meals: null };
// const brokenDrink = undefined;

// describe('Tests on API', () => {
//   it('should call fetch on Meals API', async () => {
//     jest.spyOn(global, 'fetch');
//     global.fetch.mockResolvedValue({
//       json: jest.fn().mockResolvedValue(mockDataMeals),
//     });
//     fetch(mealsURL);
//     const meal = mockDataMeals.meals[0].strMeal;
//     expect(meal).toEqual('Three Fish Pie');
//     await waitFor(() => expect(global.fetch).toBeCalledWith(mealsURL));
//   });

//   it('should call fetch on Drinks API', async () => {
//     jest.spyOn(global, 'fetch');
//     global.fetch.mockResolvedValue({
//       json: jest.fn().mockResolvedValue(mockDataDrinks),
//     });
//     fetch(drinksURL);
//     const drinks = mockDataDrinks.drinks[0].strDrink;
//     expect(drinks).toEqual('Martinez 2');
//     await waitFor(() => expect(global.fetch).toBeCalledWith(drinksURL));
//   });

//   it('should fetch broke on Meals API', async () => {
//     jest.spyOn(global, 'fetch');
//     global.fetch.mockResolvedValue({
//       json: jest.fn().mockResolvedValue(brokenMeal),
//     });
//     fetch(mealsBrokenURL);
//     const meal = mockDataMeals.meals[0].strMeal;
//     expect(meal).toEqual('Three Fish Pie');
//     expect(brokenMeal.meals).toEqual(null);
//     await waitFor(() => expect(global.fetch).toBeCalledWith(mealsBrokenURL));
//   });

//   it('should fetch broke on Drinks API', async () => {
//     jest.spyOn(global, 'fetch');
//     global.fetch.mockResolvedValue({
//       json: jest.fn().mockResolvedValue(brokenDrink),
//     });
//     fetch(drinksBrokenURL);
//     const drinks = mockDataDrinks.drinks[0].strDrink;
//     expect(drinks).toEqual('Martinez 2');
//     expect(brokenDrink).toEqual(undefined);
//     await waitFor(() => expect(global.fetch).toBeCalledWith(drinksBrokenURL));
//   });
// });
