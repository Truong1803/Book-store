import React, { useContext, useEffect, useState } from "react";
import CardProducts from "../Products/CardProducts";
import { GlobalState } from "../../../GlobalState";
function BestSeller() {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [bestSale, setBestSale] = useState([]);
  const [page, setPage] = state.productsAPI.page;
  useEffect(() => {
    setPage(1);
    products.sort((a, b) => {
      return b.sold - a.sold;
    });
    setBestSale(products.slice(0, 4));
  }, [products]);
  return (
    <div className="best-seller">
      <div className="best-seller__title">
        <h2 className="best-seller__title--h2">Best Sellers</h2>
        <p className="best-seller__title--para">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry
        </p>
      </div>
      <div className="best-seller__list">
        {bestSale.map((product) => {
          return <CardProducts product={product} key={product._id} />;
        })}
      </div>
    </div>
  );
}

export default BestSeller;
