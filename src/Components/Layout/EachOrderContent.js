import React from "react";
import { Badge } from "react-bootstrap";

const EachOrderContent = ({ receivedOrders }) => {
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
      <p>
        Iya Moria{" "}
        <Badge style={{ backgroundColor: "#b11917", color: "white" }}>0</Badge>
      </p>
      <p style={{ color: "rgb(152, 149, 149)", fontSize: "12px" }}>
        9 hours ago
      </p>
    </div>
  );
};

export default EachOrderContent;
