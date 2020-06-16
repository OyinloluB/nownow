import React from "react";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import PhoneIcon from "@material-ui/icons/Phone";

const InfoWindowTooltip = ({ user }) => {
  // const [selectedUser, setSelectedUser] = useState({ products: [] });
  // const [showBasket, setShowBasket] = useState(false);

  // const { user: loggedInUser } = useSelector(
  //   (state) => state.auth
  // );

  return (
    <>
      {/* <ShoppingBasket
        user={selectedUser}
        show={showBasket}
        setShowBasket={setShowBasket}
        alertShow="d-block"
      /> */}
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
            <a
              href={`https://wa.me/${user.phone}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon style={{ color: "#b11917", fontSize: 20 }} />
            </a>
          </p>
          <p>
            <a
              href={`tel:${user.phone}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PhoneIcon style={{ color: "#b11917", fontSize: 20 }} />
            </a>
          </p>
          {/* <p>
            <ShoppingCartIcon
              style={{
                color: "red",
                fontSize: 17,
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedUser(user);
                setShowBasket(true);
              }}
              className={
                user.type === "poc" && loggedInUser.type === "bulkbreaker"
                  ? "d-none"
                  : "d-block"
              }
            />
          </p> */}
        </div>
      </div>
    </>
  );
};

export default InfoWindowTooltip;
