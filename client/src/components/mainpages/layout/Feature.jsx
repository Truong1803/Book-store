import React, { useContext, useEffect, useState } from "react";
import CardProducts from "../Products/CardProducts";
import { GlobalState } from "../../../GlobalState";
function Feature() {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [feature, setFeature] = useState([]);
  useEffect(() => {
    setFeature(products.slice(products.length - 4, products.length));
  }, [products]);
  return (
    <div className="best-seller">
      <div className="best-seller__title">
        <h2 className="best-seller__title--h2">Featured Product</h2>
        <p className="best-seller__title--para">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry
        </p>
      </div>
      <div className="best-seller__list">
        {feature.map((product) => {
          return <CardProducts product={product} key={product._id} />;
        })}
      </div>
    </div>
  );
}

export default Feature;
