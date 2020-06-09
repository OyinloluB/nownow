import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { Badge } from "react-bootstrap";
import DateCountdown from "react-date-countdown-timer";

const EachOrderContent = ({ order, setOrder }) => {
  const userPosition = useSelector((state) => {
    return {
      lat: state.auth.user.latitude,
      lng: state.auth.user.longitude,
    };
  });

  const generateTimeDifference = useCallback((dateString) => {
    let delta =
      Math.abs(new Date().getTime() - new Date(dateString).getTime()) / 1000;
    const result = {};
    const structure = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    Object.keys(structure).forEach((key) => {
      result[key] = Math.floor(delta / structure[key]);
      delta -= result[key] * structure[key];
    });
    let timeString = "";
    const resultKeys = Object.keys(result);
    for (let i = 0; i < resultKeys.length; i++) {
      const time = resultKeys[i];
      if (result[time] > 0) {
        timeString = `${result[time]} ${time}${
          result[time] > 1 ? "s" : ""
        } ago`;
        break;
      }
    }
    return { result, timeString };
  }, []);

  const calcDistance = useCallback((p1, p2) => {
    const R = 6371.071; // Radius of the Earth in kilometers
    const rlat1 = p1.lat * (Math.PI / 180); // Convert degrees to radians
    const rlat2 = p2.lat * (Math.PI / 180); // Convert degrees to radians
    const difflat = rlat2 - rlat1; // Radian difference (latitudes)
    const difflon = (p2.lng - p1.lng) * (Math.PI / 180); // Radian difference (longitudes)

    const d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2)
        )
      );
    return d;
  }, []);

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
          {`${calcDistance(userPosition, {
            lat: orderUser.latitude,
            lng: orderUser.longitude,
          })} km`}
        </p>
        <p style={{ color: "rgb(152, 149, 149)", fontSize: "12px" }}>
          <b>Request made:</b> {timeString}
        </p>
        <p style={{ color: "rgb(152, 149, 149)", fontSize: "12px" }}>
          {order.status === "processing" && timeDiff > 0 ? (
            <><b>Time left: </b> <DateCountdown
              dateTo={deliveryDate}
              locales={["year", "month", "day", "hr", "min", "sec"]}
              locales_plural={[
                "years",
                "months",
                "days",
                "hrs",
                "mins",
                "secs",
              ]}
            />
            </>
          ) : null}
        </p>
      </div>
    </div>
  );
};

export default React.memo(EachOrderContent);
