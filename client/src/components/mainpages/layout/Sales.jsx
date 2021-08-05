import React from "react";
import { Link } from "react-router-dom";
function Sales() {
  return (
    <div className="sale__container">
      <div className="sale__img">
        <div className="sale__img--content">
          <p className="sale__img--content-text">holiday season sale</p>
          <h2 className="sale__img--content-title">
            off up to 45% for all books
          </h2>
          <Link className="sale__img--content-link" to="#">
            Buy now
          </Link>
        </div>
      </div>

      <div className="sale__feature">
        <div className="sale__feature--content background-blue">
          <div className="content">
            <h2 className="content__title">Basic</h2>
          </div>
          <div className="content__icon">
            <i className="fas fa-shipping-fast"></i>
          </div>
          <div className="content__description">
            FREE Two-Day Shipping <br />
            on millions of books
          </div>
          <div className="content__link">
            <Link to="">
              <p className="btn-link">Shop Now</p>
            </Link>
          </div>
        </div>

        <div className="sale__feature--content background-green">
          <div className="content">
            <h2 className="content__title">Plus</h2>
          </div>
          <div className="content__icon">
            <span className="content_price-currency">$</span>
            <span className="content_price-money">99</span>
            <span className="content_price-period">mo</span>
          </div>
          <div className="content__description content__description-width-2">
            Perfect for independent instructors, authors, and tutors
          </div>
          <div className="content__link">
            <Link to="">
              <p className="btn-link">Buy Card</p>
            </Link>
          </div>
        </div>

        <div className="sale__feature--content background-orange">
          <div className="content">
            <h2 className="content__title">Special</h2>
          </div>
          <div className="content__icon">
            <span className="content_price-currency">$</span>
            <span className="content_price-money">150</span>
            <span className="content_price-period">mo</span>
          </div>
          <div className="content__description content__description-width-2">
            Our gift cards are the perfect present for any occasion
          </div>
          <div className="content__link">
            <Link to="">
              <p className="btn-link">Buy Card</p>
            </Link>
          </div>
        </div>

        <div className="sale__feature--content background-red">
          <div className="content">
            <h2 className="content__title">Discount</h2>
          </div>
          <div className="content__icon">
            <span className="content_price-money">50% OFF</span>
          </div>
          <div className="content__description content__description-width-2">
            Start a new series -<br /> Up to 50% off
          </div>
          <div className="content__link">
            <Link to="">
              <p className="btn-link">Shop Now</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sales;
