import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import PhoneIcon from "@material-ui/icons/Phone";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShoppingBasket from "../Layout/ShoppingBasket";

import { getCoordinatesAddress } from "../../helpers/google-maps";
import { calcDistanceInKm } from "../../helpers/utility";

const ListHandler = ({ show, closeModal, users: propUsers }) => {
  const { user: loggedInUser, coordinates } = useSelector((state) => state.auth);

  const userTypes = ["distributor", "bulkbreaker", "poc"].filter(
    (userType) => !(loggedInUser.type === userType)
  );

  const [users, setUsers] = useState([]);
  const [userType, setUserType] = useState(userTypes[0]);
  const [selectedUser, setSelectedUser] = useState({ products: [] });
  const [showBasket, setShowBasket] = useState(false);

  useEffect(() => {
    const closeUsers = Object.keys(propUsers)
      .map((userType) =>
        propUsers[userType]
          .filter(
            (user) =>
              calcDistanceInKm(coordinates, {
                lat: user.latitude,
                lng: user.longitude,
              }) <= 2
          )
          .slice(0, 30)
      )
      .flat();
    setUsers([...closeUsers]);
  }, [propUsers, coordinates]);

  useEffect(() => {
    if (users.length > 0) {
      const fetchAddresses = async (users) => {
        try {
          const updatedUsers = [];
          for await (const user of users) {
            if (user.latitude === 0) {
              user.address = "Not Available, contact through mobile number";
            } else {
              const address = await getCoordinatesAddress(
                user.latitude,
                user.longitude
              );
              if (address) {
                user.address = address;
              }
            }
            updatedUsers.push(user);
          }
          setUsers([...updatedUsers]);
        } catch (error) {
          console.log("Error Fetching Addresses: ", error);
        }
      };
      console.log("Yooo");
      fetchAddresses(users);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users.length]);

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
        <Modal.Body style={{ maxHeight: "80vh", overflowY: "scroll" }}>
          <ul
            style={{
              paddingLeft: "0rem",
            }}
          >
            {users
              .filter(
                (user) =>
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
                      justifyContent: "space-between",
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

                        <span class={"offset-1 mr-auto"}>
                          {" "}
                          {user.name}
                          <br />
                          <span style={{ fontSize: "12px", color: "#000" }}>
                            {`Distance: ${calcDistanceInKm(coordinates, {
                              lat: user.latitude,
                              lng: user.longitude,
                            })} km`}
                          </span>
                        </span>

                        <div
                          style={{
                            // display: "flex",
                            justifyContent: "space-around",
                            width: "20%",
                          }}
                        >
                          <span>
                            <a
                              href={`https://wa.me/${user.whatsapp}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <WhatsAppIcon
                                style={{ color: "green", fontSize: 20 }}
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
                              <PhoneIcon style={{ color: "black", fontSize: 20 }} />
                            </a>
                          </span>
                          {loggedInUser.type !== "distributor" ? (
                            <span className={"ml-2"}>
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
