import React from "react";
import { Badge } from "react-bootstrap";

const EachOrderContent = ({ order, setOrder }) => {
  const generateTimeDifference = (createdAt) => {
    let delta =
      Math.abs(new Date().getTime() - new Date(createdAt).getTime()) / 1000;
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
        timeString = `${result[time]} ${time}${result[time] > 1 ? "s" : ""} ago`;
        break;
      }
    }
    return timeString;
  };
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
        {`${order.user.name} `}
        <Badge style={{ backgroundColor: "#b11917", color: "white" }}>
          {order.items.length}
        </Badge>
      </p>
      <p style={{ color: "rgb(152, 149, 149)", fontSize: "12px" }}>
        {generateTimeDifference(order.createdAt)}
      </p>
    </div>
  );
};

export default EachOrderContent;
