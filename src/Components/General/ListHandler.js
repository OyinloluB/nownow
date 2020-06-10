import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import PhoneIcon from "@material-ui/icons/Phone";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShoppingBasket from "../Layout/ShoppingBasket";

import { calcDistanceInKm } from "../../utility";

const ListHandler = ({ show, closeModal, users }) => {
  const { user: loggedInUser, coordinates } = useSelector((state) => state.auth);

  const userTypes = ["distributor", "bulkbreaker", "poc"].filter(
    (userType) => !(loggedInUser.type === userType)
  );

  const [userType, setUserType] = useState(userTypes[0]);
  const [selectedUser, setSelectedUser] = useState({ products: [] });
  const [confirm, setConfirm] = useState("");
  const [showBasket, setShowBasket] = useState(false);

  const { REACT_APP_GOOGLE_MAP_API_KEY: API_KEY } = process.env;

  // fetch(
  //   "https://maps.googleapis.com/maps/api/geocode/json?address=" +
  //     8.64516 +
  //     "," +
  //     3.3999 +
  //     "&key=" +
  //     API_KEY
  // )
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     console.log(JSON.stringify(responseJson.results[0].formatted_address));
  //   });

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
            // alignItems: "center",
          }}
        >
          <div className={"row"}>
            <ArrowBackIcon
              style={{
                color: "#b11917",
                fontSize: 20,
                cursor: "pointer",
              }}
              onClick={closeModal}
              className={"col-5"}
            />

            <span
              className={"offset-3 col-4 font-weight-bold"}
              style={{ whiteSpace: "nowrap" }}
            >
              Nearby Customers
            </span>
          </div>
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
              <div
                key={userType}
                style={{
                  width: "50%",
                  textAlign: "center",
                  padding: "10px",
                  cursor: "pointer",
                }}
                onClick={() => setUserType(userType)}
                className={i === 0 ? "bg-info" : "bg-warning"}
              >
                {`${userType[0].toUpperCase() + userType.slice(1)}s`}
              </div>
            );
          })}
        </div>
        <Modal.Body>
          <ul
            style={{
              paddingLeft: "0rem",
            }}
          >
            {users
              .filter(
                (user) =>
                  user.products.length > 0 &&
                  user.type === userType &&
                  calcDistanceInKm(coordinates, {
                    lat: user.latitude,
                    lng: user.longitude,
                  }) <= 2
              )
              .map((user) => {
                return (
                  <div
                    key={user.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <li
                      key={user.id}
                      style={{
                        display: "flex",
                        // justifyContent: "space-between",
                        width: "100%",
                        padding: "1rem",
                        borderBottom: "1px solid #f7f7f7",
                      }}
                    >
                      {user.confirmed === true ? (
                        <span
                          style={{
                            backgroundColor: "green",
                            maxHeight: "6px",
                            minWidth: "7px",
                            borderRadius: "15px",
                            marginTop: "8px",
                          }}
                        />
                      ) : (
                        <span
                          style={{
                            backgroundColor: "#b11917",
                            maxHeight: "6px",
                            minWidth: "7px",
                            borderRadius: "15px",
                            marginTop: "8px",
                          }}
                        />
                      )}

                      <span class={"offset-1 mr-auto"}> {user.name}</span>
                      <span>
                        {` Distance: ${calcDistanceInKm(coordinates, {
                          lat: user.latitude,
                          lng: user.longitude,
                        })} km`}
                      </span>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          width: "20%",
                        }}
                      >
                        <span>
                          <a
                            href={`https://wa.me/${user.phone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <WhatsAppIcon style={{ color: "green", fontSize: 20 }} />
                          </a>
                        </span>
                        <span>
                          {" "}
                          <a
                            href={`tel:${user.phone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <PhoneIcon style={{ color: "black", fontSize: 20 }} />
                          </a>
                        </span>
                        {loggedInUser.type !== "distributor" ? (
                          <span>
                            <ShoppingCartIcon
                              style={{
                                color: "red",
                                fontSize: 20,
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                closeModal();
                                setSelectedUser(user);
                                setShowBasket(true);
                              }}
                            />
                          </span>
                        ) : null}
                      </div>
                    </li>
                  </div>
                );
              })}
          </ul>
        </Modal.Body>

        {/* <Modal.Footer>
          <button
            className="btn"
            style={{ background: "#b11917", color: "white" }}
            onClick={closeModal}
          >
            <BlurOffRoundedIcon /> Away
          </button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default React.memo(ListHandler);
