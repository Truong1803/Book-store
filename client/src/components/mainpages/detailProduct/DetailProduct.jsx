import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { GlobalState } from "../../../GlobalState";
import CardProducts from "../Products/CardProducts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function DetailProduct(props) {
  const params = useParams();
  const state = useContext(GlobalState);
  const addCart = state.userAPI.addCart;
  const [products] = state.productsAPI.products;
  const [detailProduct, setDetailProduct] = useState([]);
  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setDetailProduct(product);
      });
    }
  }, [params.id, products]);
  if (detailProduct.length === 0) return null;
  const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={(className, "icon-related next")} onClick={onClick}>
        <i className="fas fa-arrow-circle-right"></i>
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={(className, "icon-related prev")} onClick={onClick}>
        <i className="fas fa-arrow-circle-left"></i>
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 510,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="detail-product-container">
      <div className="detail-product">
        <div className="detai-product-img">
          <img
            className="detai-product-img-tag"
            src={detailProduct.images.url}
            alt=""
          />
        </div>
        <div className="detail-product-box">
          <h1 className="detail-product-title">{detailProduct.title}</h1>
          <p className="detail-product-author">
            Author: <span>{detailProduct.author}</span>
          </p>
          <div className="detail-product-price">
            <p className="detail-product-price_sale">
              {parseFloat(detailProduct.price * 1000).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
            <p className="detail-product-price_old">
              {parseFloat(detailProduct.oldPrice * 1000).toLocaleString(
                "vi-VN",
                {
                  style: "currency",
                  currency: "VND",
                }
              )}
            </p>
          </div>
          <p className="detail-product-sold">
            Sold: <span>{detailProduct.sold}</span>
          </p>
          <button
            className="book-detail__content--add"
            onClick={() => addCart(detailProduct)}
          >
            Add to cart
          </button>
        </div>
      </div>

      <div className="related">
        <p className="related__title">Related</p>
        <div className="related__slider--wrapper">
          <Slider {...settings} className="related__slider">
            {products.map((product) => {
              return product.category === detailProduct.category &&
                product._id !== detailProduct._id ? (
                <CardProducts key={product._id} product={product} />
              ) : null;
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
