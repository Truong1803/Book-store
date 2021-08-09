import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";
function CardCart({ product }) {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [cart, setCart] = state.userAPI.cart;
  const addToCart = async (cart) => {
    await axios.patch(
      "/user/addCart",
      { cart },
      { headers: { Authorization: token } }
    );
  };
  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quanlity += 1;
      }
    });
    setCart([...cart]);
    addToCart(cart);
  };
  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quanlity === 1 ? (item.quanlity = 1) : (item.quanlity -= 1);
      }
    });
    setCart([...cart]);
    addToCart(cart);
  };
  const removeProduct = (id) => {
    if (window.confirm("Do you want to delete this product?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
      setCart([...cart]);
      addToCart(cart);
    }
  };
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return (
    <div className="cardcart__products">
      <i
        className="fas fa-times"
        onClick={() => removeProduct(product._id)}
      ></i>
      <Link to={`/detail/${product._id}`} className="cardcart__products--img">
        <img src={product.images.url} alt="Product" />
      </Link>
      <div className="cardcart__products--detail">
        <p className="cardcart__products--detail__name">{product.title}</p>
        <p className="cardcart__products--detail__price">
          {formatter.format(parseFloat(product.price) * 1000)}
        </p>
        <p className="cardcart__products--detail__old-price">
          {formatter.format(parseFloat(product.oldPrice) * 1000)}
        </p>
      </div>
      <div className="cardcart__products--amount">
        <button onClick={() => decrement(product._id)}> - </button>
        <span>{product.quanlity}</span>
        <button onClick={() => increment(product._id)}> + </button>
        <div className="cardcart__products--amount-content">
          <p className="cardcart__products--amount__total">Total:</p>
          <p className="cardcart__products--amount__money">
            {formatter.format(
              parseFloat(product.quanlity * product.price) * 1000
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardCart;
