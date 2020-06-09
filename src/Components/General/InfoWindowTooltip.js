import React from "react";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import PhoneIcon from "@material-ui/icons/Phone";

const InfoWindowTooltip = ({ user }) => {
  return (
    <div>
      <p
        style={{
          color: "#b11917",
          fontWeight: "bold",
        }}
      >
        {user.name}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "120px",
        }}
      >
        <p>
          <a href={`https://wa.me/${user.phone}`} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon style={{ color: "#b11917", fontSize: 20 }} />
          </a>
        </p>
        <p>
          <a href={`tel:${user.phone}`} target="_blank" rel="noopener noreferrer">
            <PhoneIcon style={{ color: "#b11917", fontSize: 20 }} />
          </a>
        </p>
      </div>
    </div>
  );
};

export default InfoWindowTooltip;
