import React from "react";

const InfoWindowTooltip = ({ user }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "220px",
      }}
    >
      <p>
        <a href={`https://wa.me/${user.phone}`} target="_blank">
          {user.phone}
        </a>
      </p>
      <p>
        <a href={`tel:${user.phone}`} target="_blank">
          {user.phone}
        </a>
      </p>
    </div>
  );
};

export default InfoWindowTooltip;
