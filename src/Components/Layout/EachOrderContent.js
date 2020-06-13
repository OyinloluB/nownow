import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { Badge } from "react-bootstrap";
import DateCountdown from "react-date-countdown-timer";

import {generateTimeDifference, calcDistanceInKm} from '../../utility';

const EachOrderContent = ({ order, setOrder }) => {
  const userPosition = useSelector((state) => {
    return {
      lat: state.auth.user.latitude,
      lng: state.auth.user.longitude,
    };
  });

  const { timeString } = generateTimeDifference(order.createdAt);

  let deliveryDate;
  let timeDiff;

  if (order.status === "processing") {
    deliveryDate = new Date(order.updatedAt);
    deliveryDate.setHours(deliveryDate.getHours() + 24);
    timeDiff = deliveryDate.getTime() - new Date().getTime();
  }

  let orderUser = {};

  if (order.user) {
    orderUser = { ...order.user };
  } else {
    orderUser = { ...order.owner };
  }


  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgb(223, 223, 223)",
        paddingBottom: "9px",
        padding: "9px",
      }}
    >
      <p
        style={{ cursor: "pointer" }}
        onClick={() => {
          setOrder(order);
        }}
      >
        {orderUser.name}
        <Badge
          style={{
            backgroundColor: "#b11917",
            color: "white",
            marginLeft: "5px",
          }}
        >
          {order.items.length}
        </Badge>
      </p>
      <div>
        <p style={{ color: "rgb(152, 149, 149)", fontSize: "12px" }}>
          <b>Distance:</b>{" "}
          {`${calcDistanceInKm(userPosition, {
            lat: orderUser.latitude,
            lng: orderUser.longitude,
          })} km`}
        </p>
        <p style={{ color: "rgb(152, 149, 149)", fontSize: "12px" }}>
          <b>Request made:</b> {timeString}
        </p>
        <p style={{ color: "#B11917", fontSize: "12px" }}>
          {order.status === "processing" && timeDiff > 0 ? (
            <>
              <b>Time left: </b>{" "}
              <DateCountdown
                dateTo={deliveryDate.toISOString()}
                locales={["year", "month", "day", "hr", "min", "sec"]}
                locales_plural={["years", "months", "days", "hrs", "mins", "secs"]}
              />
            </>
          ) : null}
        </p>
      </div>
    </div>
  );
};

export default React.memo(EachOrderContent);
