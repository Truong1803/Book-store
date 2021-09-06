import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./cart/Cart";
import Products from "./Products/Products";
import NotFound from "./utils/NotFound/NotFound";
import Landing from "./layout/Landing";
import DetailProduct from "./detailProduct/DetailProduct";
import OderHistory from "./history/OderHistory";
import OrderDetail from "./history/OderDetail";
import Categories from "./categories/Categories";
import CreateProduct from "./createProduct/CreateProduct";
import { GlobalState } from "../../GlobalState";
function Pages() {
  const state = useContext(GlobalState);
  const [activeMenu] = state.activeMenu;
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  return (
    <main className={`main ${activeMenu ? "active-menu" : ""}`}>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/detail/:id" exact component={DetailProduct} />

        <Route path="/product" exact component={Products} />
        <Route path="/login">
          {isLogged ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          {isLogged ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route
          path="/category"
          exact
          component={isAdmin ? Categories : NotFound}
        />
        <Route
          path="/create_product"
          exact
          component={isAdmin ? CreateProduct : NotFound}
        />
        <Route
          path="/edit_product/:id"
          exact
          component={isAdmin ? CreateProduct : NotFound}
        />
        <Route
          path="/history"
          exact
          component={isLogged ? OderHistory : NotFound}
        />
        <Route
          path="/history/:id"
          exact
          component={isLogged ? OrderDetail : NotFound}
        />
        <Route path="/cart" exact component={Cart} />

        <Route path="*" exact component={NotFound} />
      </Switch>
    </main>
  );
}

export default Pages;
