import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import PhoneIcon from "@material-ui/icons/Phone";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import ShoppingBasket from "../Layout/ShoppingBasket";

const ListHandler = ({ show, closeModal, users: propUsers, resetCenter }) => {
  const { user: loggedInUser, coordinates } = useSelector((state) => state.auth);

  const userTypes = ["bulkbreaker", "distributor", "poc"].filter(
    (userType) => !(loggedInUser.type === userType)
  );

  const [users, setUsers] = useState([]);
  const [userType, setUserType] = useState(userTypes[0]);
  const [selectedUser, setSelectedUser] = useState({ products: [] });
  const [showBasket, setShowBasket] = useState(false);
  const [color1, setColor1] = useState("grey");
  const [color2, setColor2] = useState("");

  useEffect(() => {
    const closeUsers = Object.keys(propUsers)
      .map((userType) => propUsers[userType])
      .flat();
    setUsers([...closeUsers]);
  }, [propUsers, coordinates]);

  const handleType = (userType) => {
      setUserType(userType); 
      if(userType==='poc' || (userType==="bulkbreaker" && loggedInUser.type==='poc') ) {
        setColor2("grey");
        setColor1("");
      }
      else if(userType="distributor" || (userType==="bulkbreaker" && loggedInUser.type==='distributor')) {
        setColor2("");
        setColor1("grey");
      }      
  }

  return (
    <>
      <ShoppingBasket
        user={selectedUser}
        show={showBasket}
        setShowBasket={setShowBasket}
        alertShow="d-block"
      />
      <Modal
        show={show}
        onHide={closeModal}
        style={{ bottom: "0px", position: "fixed" }}
      >
        <Modal.Header
          style={{
            color: "black",
            background: "#f7f7f7",
            display: "flex",
          }}
        >
          <ArrowBackIcon
            style={{
              color: "#b11917",
              fontSize: 20,
              cursor: "pointer",
              border: "1px solid #b11917",
              borderRadius: "2px",
            }}
            className={"col-2 mt-1 "}
            onClick={closeModal}
          />

          <span
            className={"col-6 font-weight-bold mr-auto"}
            style={{ whiteSpace: "nowrap", fontSize: 18 }}
          >
            Nearby{" "}
            {userType !== "poc"
              ? userType[0].toUpperCase() + userType.slice(1) + "s"
              : "Retail Stores"}
          </span>
          <RotateLeftIcon
            style={{ color: "black", cursor: 'pointer' }}
            onClick={resetCenter}
          />
        </Modal.Header>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            color: "white",
          }}
        >
          {userTypes.map((userType, i) => {
            return (
              <button
                key={userType}
                style={{
                  width: "50%",
                  textAlign: "center",
                  cursor: "pointer",
                  color: '#45130F',
                  fontWeight: 'bold',
                  backgroundColor: i === 0 ?  color1  :  color2,
                  border: '1px solid grey',
                  fontSize: "15px",
                  whiteSpace: "nowrap"
                }}
                className={"p-1 pt-2 pb-2 p-md-2"}
                onClick={() => handleType(userType) }
              >
                {userType === "distributor"
                  ? "Buy from Distributors"
                  : userType === "bulkbreaker" && loggedInUser.type === "poc"
                  ? "Buy from Bulkbreakers"
                  : userType === "bulkbreaker" && loggedInUser.type === "distributor"
                  ? "Sell to Bulkbreakers"
                  : userType === "poc"
                  ? "Sell to Retail Stores"
                  : ""}
              </button>
            );
          })}
        </div>
        <Modal.Body style={{ maxHeight: "70vh", overflowY: "scroll" }}>
          <ul
            style={{
              paddingLeft: "0rem",
            }}
          >
            {users
              .filter((user) => user.type === userType)
              .slice(0, 60)
              .map((user, i) => {
                return (
                  <div
                    key={user.id}
                    style={{
                      justifyContent: "space-between",
                      fontSize: "14px",
                    }}
                  >
                    <li
                      key={user.id}
                      className={"list-group"}
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderBottom: "1px solid #f7f7f7",
                      }}
                    >
                      <div className={"d-flex"}>
                        <span
                          style={{
                            backgroundColor:
                              user.products.length === 0
                                ? "grey"
                                : user.confirmed === false
                                ? "#b11917"
                                : "green",
                            maxHeight: "6px",
                            minWidth: "7px",
                            borderRadius: "15px",
                            marginTop: "8px",
                          }}
                        />

                        <span class={"offset-1 mr-auto font-weight-bold"}>
                          {" "}
                          {user.name}
                          <br />
                          <span style={{ fontSize: "11px", color: "#000" }}>
                            {`Distance: ${
                              user.distance < 1
                                ? `${Math.floor(user.distance * 1000)} m`
                                : `${user.distance.toFixed(2)} km`
                            } `}
                            <LocalShippingIcon
                              style={{
                                fontSize: 15,
                                visibility: user.delivery ? "visible" : "hidden",
                              }}
                              // className={"offset-1"}
                            />
                            <br />
                            <span
                              style={{
                                fontSize: "10px",
                                color:
                                  user.products.length === 0
                                    ? "grey"
                                    : user.confirmed === false
                                    ? "#B11917"
                                    : "green",
                              }}
                            >
                              {user.products.length === 0
                                ? "Inactive"
                                : user.confirmed === false
                                ? "Offline"
                                : "Online"}
                            </span>
                          </span>
                        </span>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            width: "25%",
                          }}
                        >
                          <span>
                            <a
                              href={`https://wa.me/${user.whatsapp}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <WhatsAppIcon
                                style={{ color: "green", fontSize: 17 }}
                              />
                            </a>
                          </span>
                          <span>
                            {" "}
                            <a
                              href={`tel:${user.phone}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={"ml-2"}
                            >
                              <PhoneIcon style={{ color: "black", fontSize: 17 }} />
                            </a>
                          </span>

                          {loggedInUser.type !== "distributor" ? (
                            <span className={"ml-2 mt-1"}>
                              <ShoppingCartIcon
                                style={{
                                  color: "red",
                                  fontSize: 17,
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  setSelectedUser(user);
                                  user.products.length > 0
                                    ? setShowBasket(true)
                                    : setShowBasket(false);
                                  user.products.length > 0
                                    ? closeModal()
                                    : setShowBasket(false);
                                }}
                                
                                className={
                                  user.type === "poc" &&
                                  loggedInUser.type === "bulkbreaker"
                                    ? "d-none"
                                    : "d-block"
                                }
                              />
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <div className={"col-8 text-justify d-block"}>
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#B11917",
                            fontWeight: "bold",
                          }}
                          className={"col-12 ml-2 ml-md-3 d-block"}
                        >
                          {user.address}
                        </span>
                      </div>
                    </li>
                  </div>
                );
              })}
          </ul>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(ListHandler);
