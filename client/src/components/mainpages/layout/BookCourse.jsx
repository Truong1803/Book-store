import React from "react";
import Book from "../../../assets/img/book-hay.jpg";
import Book_2 from "../../../assets/img/book-hay-2.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function BookCourse() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
  };
  return (
    <div className="bookcourse">
      <Slider className="bookcourse__slider" {...settings}>
        <img src={Book} alt="" />
        <img src={Book_2} alt="" />
      </Slider>
    </div>
  );
}

export default BookCourse;
