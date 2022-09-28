import { useEffect, useState } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';

export default function Carousel({ carousel }) {
  const [type, setType] = useState('meals');
  useEffect(() => {
    const getType = () => {
      if (window.location.href.includes('meals')) {
        setType('meals');
      } else {
        setType('drinks');
      }
    };
    getType();
  }, []);
  return (
    <Swiper
      slidesPerView={ 2 }
      spaceBetween={ 30 }
      pagination={ { clickable: true } }
      modules={ [Pagination] }
      className="mySwiper"
    >
      {carousel.map((recipe, index) => (
        <SwiperSlide key={ index }>
          <p data-testid={ `${index}-recommendation-title` }>
            {type === 'meals' ? recipe.strDrink : recipe.strMeal}
          </p>
          <img
            src={ type === 'meals' ? recipe.strDrinkThumb : recipe.strMealThumb }
            alt="food_img"
            width="150px"
            height="150px"
            data-testid={ `${index}-recommendation-card` }
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

Carousel.propTypes = {
  carousel: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
