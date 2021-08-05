import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";
import { useHistory } from "react-router";
function Aside({ style_ovl, style_nav }) {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [category, setCategory] = state.productsAPI.category;
  const [titleProduct, setTitleProduct] = state.titleProduct;
  const [search, setSearch] = state.productsAPI.search;
  const history = useHistory();
  const handleCategory = (value) => {
    setCategory(`category=${value}`);
    setTitleProduct(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      history.push("/product");
    }
  };
  return (
    <>
      <nav className={`nav_pc ${style_nav}`}>
        <ul>
          <li className="side-nav__form">
            <form onSubmit={handleSubmit}>
              <input
                className="side-nav__form--input"
                placeholder="Search For Product"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="side-nav__form--search" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </li>
          <li>
            <Link to="/" className="nav_pc-link">
              <i className="fas fa-home"></i>
              <span>Home</span>
            </Link>
          </li>
        </ul>

        {categories.map((item) => (
          <ul key={item._id} className="nav_pc-list">
            <li onClick={() => handleCategory(item.name)}>
              <Link to={`/product`} className="nav_pc-link">
                <i className="fas fa-book"></i>
                <span>{item.name}</span>
              </Link>
            </li>
          </ul>
        ))}
      </nav>
    </>
  );
}

export default Aside;
