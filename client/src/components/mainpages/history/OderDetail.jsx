import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { GlobalState } from "../../../GlobalState";
function OrderDetail(props) {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  const [orderDetail, setOrderDetail] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      history.forEach((item) => {
        if (item._id === params.id) setOrderDetail(item);
      });
    }
  }, [params.id, history]);
  if (orderDetail.length === 0) return null;
  return (
    <div className="history-page">
      <h2>Oder Detail</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Country Code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderDetail.address.recipient_name}</td>
            <td>
              {orderDetail.address.line1 + "-" + orderDetail.address.city}
            </td>
            <td>{orderDetail.address.postal_code}</td>
            <td>{orderDetail.address.country_code}</td>
          </tr>
        </tbody>
      </table>

      <table style={{ margin: "30px 0px" }}>
        <thead>
          <tr>
            <th></th>
            <th>Products</th>
            <th>Quanlity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orderDetail.cart.map((item) => (
            <tr key={item._id}>
              <td>
                <img src={item.images.url} alt="" />
              </td>
              <td>{item.title}</td>
              <td>{item.quanlity}</td>
              <td>$ {item.price * item.quanlity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderDetail;
