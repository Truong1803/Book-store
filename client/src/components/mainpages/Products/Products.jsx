import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utils/Loading/Loading";
import CardProducts from "./CardProducts";
import axios from "axios";
import Pagination from "./Pagination";
function Products() {
  const state = useContext(GlobalState);
  const [titleProduct] = state.titleProduct;
  const [products, setProducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [sort, setSort] = state.productsAPI.sort;
  const [page] = state.productsAPI.page;
  const [isCheck, setIsCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;
  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) {
        product.checked = !product.checked;
      }
    });
    setProducts([...products]);
  };

  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true);
      if (public_id !== "none") {
        const destroyImg = axios.post(
          "/api/destroy",
          { public_id },
          {
            headers: { Authorization: token },
          }
        );
        const deleteProduct = axios.delete(`/api/product/${id}`, {
          headers: { Authorization: token },
        });

        await destroyImg;
        await deleteProduct;
      }

      setCallback(!callback);
      setLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !isCheck;
    });
    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    products.forEach((product) => {
      if (product.checked) deleteProduct(product._id, product.images.public_id);
    });
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <>
      <div className="products">
        <div className="products_title">
          <div className="products__desc">
            {titleProduct ? titleProduct : "All Products"}
          </div>
          {isAdmin && (
            <div className="delete-all">
              <span>Select all</span>
              <input type="checkbox" checked={isCheck} onChange={checkAll} />
              <button onClick={deleteAll}>Delete ALL</button>
            </div>
          )}
        </div>

        <div className="row_sort">
          <span>Sort By: </span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Newest</option>
            <option value="sort=oldest">Oldest</option>
            <option value="sort=-sold">Best sales</option>
            <option value="sort=-price">Price: Hight-Low</option>
            <option value="sort=price">Price: Low-Hight</option>
          </select>
        </div>
        {products.map((product) => {
          return (
            <CardProducts
              key={product._id}
              product={product}
              isAdmin={isAdmin}
              deleteProduct={deleteProduct}
              handleCheck={handleCheck}
            />
          );
        })}
        <Pagination />
      </div>
      {products.length === 0 && <Loading />}
    </>
  );
}

export default Products;
