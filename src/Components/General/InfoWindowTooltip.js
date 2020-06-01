import React from "react";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import PhoneIcon from "@material-ui/icons/Phone";

const InfoWindowTooltip = ({ user }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "130px",
      }}
    >
      <p>
        <a href={`https://wa.me/${user.phone}`} target="_blank">
          <WhatsAppIcon style={{ color: "#b11917", fontSize: 20 }} />
        </a>
      </p>
      <p>
        <a href={`tel:${user.phone}`} target="_blank">
          <PhoneIcon style={{ color: "#b11917", fontSize: 20 }} />
        </a>
      </p>
    </div>
  );
};

export default InfoWindowTooltip;
