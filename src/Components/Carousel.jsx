import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';


export default function Carousel({ carousel }) {
  return (
    <Swiper
      slidesPerView={ 2 }
      spaceBetween={ 30 }
      pagination={ { clickable: true } }
      modules={ [Pagination] }
      className="mySwiper"
    >
      {carousel.map((drink, index) => (
        <SwiperSlide key={ index }>
          <p data-testid={ `${index}-recommendation-title` }>{drink.strDrink}</p>
          <img
            src={ drink.strDrinkThumb }
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
