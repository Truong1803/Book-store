import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
function CardProducts({ product, isAdmin, deleteProduct, handleCheck }) {
  const state = useContext(GlobalState);
  const addCart = state.userAPI.addCart;
  return (
    <div className="book">
      {isAdmin && (
        <input
          type="checkbox"
          checked={product.checked}
          onChange={() => handleCheck(product._id)}
        />
      )}
      <Link to={`/detail/${product._id}`} className="book__link">
        <img
          src={product.images.url}
          className="book__link--img"
          alt="book"
        ></img>
      </Link>
      <div className="book__content">
        <div className="book__content--name">{product.title}</div>
        <div className="book__content--price">
          {(product.price * 1000).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </div>
        <div className="book__content--old-price">
          {(product.oldPrice * 1000).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </div>
        {isAdmin ? (
          <div className="btn-card">
            <button
              onClick={() => {
                deleteProduct(product._id, product.images.public_id);
              }}
              className="book__content--button"
            >
              Delete
            </button>
            <Link
              to={`/edit_product/${product._id}`}
              className="book__content--button-edit"
            >
              Edit
            </Link>
          </div>
        ) : (
          <button
            onClick={() => addCart(product)}
            className="book__content--button"
          >
            Add cart
          </button>
        )}
      </div>
    </div>
  );
}

export default CardProducts;
