import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

import classes from "./DeliveryCard.module.css";

import ConfirmDeliveryItem from "./ConfirmDeliveryItem";
import StarRating from "../Layout/StarRating";

import { updateOrder } from "../../redux/order/order.actions";

const DeliveryCard = ({ order }) => {
  const [open, setOpen] = useState(true);
  const [showRating, setShowRating] = useState(false);
  const dispatch = useDispatch();

  const handleConfirmOrder = (confirmed) => {
    const status = confirmed ? "confirmed" : "delayed";
    dispatch(updateOrder(order._id, { status }))
      .then(() => {
        if (confirmed) {
          setShowRating(true);
        } else {
          setOpen(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleRating = (rating, comment) => {
    dispatch(updateOrder(order._id, { review: { rating, comment } }))
      .then(() => setOpen(false))
      .catch((err) => {
        console.log(err);
        setOpen(false);
      });
  };
  return open ? (
    showRating ? (
      <StarRating rateOrder={handleRating} />
    ) : (
      <div className={["p-3", classes.container].join(" ")}>
        <div style={{ padding: "1rem 1rem 0rem 1rem", borderBottom: "none" }}>
          <h3
            style={{ fontSize: "13px", borderBottom: "1px solid grey" }}
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
            style={{
              padding: "0.4rem 0.25rem",
              justifyContent: "space-between",
            }}
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
                style={{ width: "100%" }}
              >
                Yes, goods received in full and in good condition
              </Button>
              <Button
                variant="success"
                onClick={() => handleConfirmOrder(true)}
                style={{ width: "100%", backgroundColor: "rgb(244, 156, 0)" }}
              >
                Received, but with some issues
              </Button>
              <Button
                variant="danger"
                onClick={() => handleConfirmOrder(false)}
                style={{ width: "100%" }}
              >
                No, goods not received at all
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  ) : null;
};

export default DeliveryCard;
