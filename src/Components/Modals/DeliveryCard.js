import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

import ConfirmDeliveryItem from "./ConfirmDeliveryItem";
import StarRating from "../Layout/StarRating";

import { updateOrderStatus, rateOrder } from "../../redux/order/order.actions";

const DeliveryCard = ({ order, close }) => {
  const [showRating, setShowRating] = useState(false);
  const dispatch = useDispatch();

  const handleConfirmOrder = (confirmed) => {
    const status = confirmed ? "confirmed" : "delayed";
    dispatch(updateOrderStatus(order._id, status))
      .then(() => {
        if(confirmed){
          setShowRating(true);
        } else {
          close();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleRating = (rating) => {
    // console.log(rating);
    dispatch(rateOrder(order._id, rating))
      .then(() => close())
      .catch((err) => console.log(err));
  };
  return showRating ? (
    <StarRating rateOrder={handleRating} setShowRating={setShowRating} />
  ) : (
    <div className={"p-3"}>
      <div style={{ padding: "1rem 1rem 0rem 1rem", borderBottom: "none" }}>
        <h3
          style={{ fontSize: "16px", borderBottom: "1px solid grey" }}
          className={"text-center font-weight-bold "}
        >
          Confirm Delivery from {order.owner.name}
        </h3>
      </div>
      <div className={"p-3"}>
        {order.items.map((item) => {
          return <ConfirmDeliveryItem key={item._id} item={item} />;
        })}
        <div
          className={"d-flex font-weight-bold mt-2"}
          style={{ color: "#B11917" }}
        >
          <span className={"mr-auto text-dark"}>Total: </span>&#8358;{" "}
          {Math.floor(order.totalAmount)}
        </div>
      </div>
      <div>
        <div
          style={{ padding: "0.4rem 0.25rem", justifyContent: "space-between" }}
        >
          <p
            style={{ fontSize: "15px", color: "#B11917" }}
            className={"text-center"}
          >
            Did you receive your delivery?
          </p>
          <div>
            <Button
              variant="success"
              onClick={() => handleConfirmOrder(true)}
              style={{ width: "50%" }}
            >
              Yes
            </Button>
            <Button
              variant="danger"
              onClick={() => handleConfirmOrder(false)}
              style={{ marginLeft: "10px", width: "45%" }}
            >
              No
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCard;
