import React, { useContext, useEffect, useRef, useState } from "react";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import Aside from "../mainpages/utils/Aside/Aside";
import axios from "axios";
import { useHistory } from "react-router";
function Header() {
  const state = useContext(GlobalState);
  const [activeMenu, setActiveMenu] = state.activeMenu;
  const [openMenu, setOpenMenu] = useState(false);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [search, setSearch] = state.productsAPI.search;
  //const [searchItem, setSearchItem] = useState("");
  const searchItem = useRef();
  const [openAccount, setOpenAccount] = useState(false);
  const [cart] = state.userAPI.cart;
  const history = useHistory();

  const handleOpenMenuOnClick = () => {
    setOpenMenu(!openMenu);
    setActiveMenu(!activeMenu);
  };
  const handleClickAccount = () => {
    setOpenAccount(!openAccount);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(searchItem.current.value);
    if (search) {
      history.push("/product");
    }
  };
  const logoutUser = async () => {
    await axios.get("/user/logout");

    localStorage.removeItem("firstLogin");

    window.location.href = "/";
  };
  let body;
  if (isLogged && isAdmin) {
    body = (
      <>
        <Link to="">
          <li>My Account</li>
        </Link>
        <Link to="/create_product">
          <li>Create Products</li>
        </Link>
        <Link to="/category">
          <li>Categories</li>
        </Link>
        <Link to="/history">
          <li>History</li>
        </Link>
        <Link to="/" onClick={logoutUser}>
          <li>Logout</li>
        </Link>
      </>
    );
  } else if (isLogged) {
    body = (
      <>
        <Link to="">
          <li>My Account</li>
        </Link>
        <Link to="/history">
          <li>History</li>
        </Link>
        <Link to="/" onClick={logoutUser}>
          <li>Logout</li>
        </Link>
      </>
    );
  } else {
    body = (
      <Link to="/login">
        <li>Login ✥ Register</li>
      </Link>
    );
  }
  return (
    <>
      <header>
        <div className="header__wrapper">
          <div className="header__menu" onClick={handleOpenMenuOnClick}>
            <i className="fas fa-bars"></i>
            <div className="header__category-content  hide-on-mobile">
              All Category
            </div>
          </div>
          <div className="header__form hide-on-mobile">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="header__form-input"
                placeholder="Search for product"
                // value={searchItem}
                // onChange={(e) => setSearchItem(e.target.value)}
                ref={searchItem}
              />
              <button className="header__form-search">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>

          <div className="header__logo">
            <Link to="/">
              <h1 className="header__logo-text">E-Book</h1>
            </Link>
          </div>

          <div className="header__user">
            <Link to="/cart" className="header__user-cart-link">
              <div className="header__user-cart-icon">
                {/* <img src={cart} alt="" width="25" fill="white" /> */}
                <i className="fas fa-shopping-cart"></i>
                <div>
                  <span>{cart.length}</span>
                </div>
              </div>
            </Link>

            <div className="header__user-account" onClick={handleClickAccount}>
              <div className="header__user-account-icon">
                <i className="fas fa-sign-in-alt"></i>
              </div>
              <ul
                className={`header__user--account__dropdown ${
                  openAccount ? "openAccount" : ""
                }`}
              >
                {body}
              </ul>
            </div>
          </div>
        </div>
      </header>
      <Aside
        style_ovl={openMenu ? "active_overlay" : ""}
        style_nav={openMenu ? "active_navpc" : ""}
      />
    </>
  );
}

export default Header;
