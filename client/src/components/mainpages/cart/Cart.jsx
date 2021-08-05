import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import CardCart from "./CardCart";
import axios from "axios";
import PaypalButton from "./PaypalButton";
function Cart() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [total, setTotal] = useState(0);
  const [cart, setCart] = state.userAPI.cart;
  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quanlity;
      }, 0);
      setTotal(total);
    };
    getTotal();
  }, [cart]);
  const addToCart = async (cart) => {
    await axios.patch(
      "/user/addCart",
      { cart },
      { headers: { Authorization: token } }
    );
  };

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;
    await axios.post(
      "/api/payment",
      { cart, paymentID, address },
      { headers: { Authorization: token } }
    );
    setCart([]);
    addToCart([]);
    alert("You have successfully placed an order");
  };
  return (
    <div className="cart__products">
      <h1 className="cart__products-title">Cart</h1>
      {cart && cart.length ? (
        cart.map((item) => <CardCart product={item} key={item._id} />)
      ) : (
        <div className="cart__empty">
          <p className="cart__empty-text">No products in the cart</p>
          <Link to="/" className="cart__empty-link">
            Back to shopping
          </Link>
        </div>
      )}

      {cart.length ? (
        <div className="cart__products-pay">
          <div className="cart__products-pay-total">
            <p>Total: </p>
            <span>
              {(total * 1000).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>

          <PaypalButton total={total} tranSuccess={tranSuccess} />
        </div>
      ) : null}
    </div>
  );
}

export default Cart;
