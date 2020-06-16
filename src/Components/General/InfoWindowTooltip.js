import React, { useState } from "react";
import { useSelector } from "react-redux";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import PhoneIcon from "@material-ui/icons/Phone";
import ShoppingBasket from "../Layout/ShoppingBasket";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const InfoWindowTooltip = ({ user }) => {

  const {user: loggedInUser } = useSelector((state) => state.auth);
  const [showBasket, setShowBasket] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ products: [] });
  return (
    <div>
      <ShoppingBasket
        user={selectedUser}
        show={showBasket}
        setShowBasket={setShowBasket}
        alertShow="d-block"
      />
      <p
        style={{
          color: "#b11917",
          fontWeight: "bold",
        }}
      >
        {user.name}
      </p>
      <p
        style={{
          color: "black",
          fontWeight: "bold",
        }}
      >
        {user.address}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100px",
        }}
      >
        <p className={'mt-2'}>
          <a href={`https://wa.me/${user.whatsapp}`} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon style={{ color: "green", fontSize: 20 }} />
          </a>
        </p>
        <p className={'mt-2'}>
          <a href={`tel:${user.phone}`} target="_blank" rel="noopener noreferrer">
            <PhoneIcon style={{ color: "black", fontSize: 20 }} />
          </a>
        </p>
        
        <span
         onClick={() => {
          setSelectedUser(user);
          setShowBasket(true);
        }}
        className={ loggedInUser.type!=='distributor'? user.type==='poc' && loggedInUser.type==='bulkbreaker'? 'd-none':'d-block' : 'd-none' }
        >
          <ShoppingCartIcon style={{ color: "#b11917", fontSize: 20 }} />
        </span>
      </div>
      </div>
  );
};

export default InfoWindowTooltip;
