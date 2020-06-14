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
      .map((userType) => propUsers[userType])
      .flat();
    setUsers([...closeUsers]);
  }, [propUsers, coordinates]);
  const { REACT_APP_GOOGLE_MAP_API_KEY: API_KEY } = process.env;
 
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
                border: '1px solid #b11917',
                borderRadius: '2px'
              }}
              className={"col-3"}
              onClick={closeModal}
            />

            <span
              className={"offset-3 offset-md-3 col-4 font-weight-bold"}
              style={{ whiteSpace: "nowrap" }}
            >
              
              Nearby { userType!=='poc' ? userType[0].toUpperCase() + userType.slice(1) + 's' : 'Retail Stores'}
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
                  cursor: "pointer",
                  backgroundColor: i === 0 ? "Green" : "#B11917"
                }}
                className={'p-1 pt-3 pb-3 p-md-3'}
                onClick={() => setUserType(userType) }
                // className={i === 0 ? "bg-info" : "bg-warning"}
              >

                { userType === 'distributor' ? 'Buy from Distributors' : 
                   userType === 'bulkbreaker' && loggedInUser.type === 'poc' ? 'Buy from Bulkbreakers' :
                   userType ==='bulkbreaker' && loggedInUser.type === 'distributor' ? 'Sell to Bulkbreakers' :
                   userType ==='poc' ? 'Sell to Retail Stores' : ''
                } 
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
              .filter((user) => user.type === userType)
              .map((user, i) => {

                if(user.latitude === 0) {
                  user.address = 'Not Available, contact through mobile number'
                }
                else { 
                  fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" +
                    user.latitude +
                    "," +
                    user.longitude +
                    "&key=" +
                    API_KEY
                ).then((response) => response.json())
                .then((responseJson) => {
                  if(responseJson.results.length > 1){
                    // forcing the fetched address into the users data
                      user.address = responseJson.results[0].formatted_address;
                  }
                  else {
                    user.address = 'Loading...'
                  }
                }).catch(error=>console.log('error'))
              }

                return (
                  <div
                    key={user.id}
                    style={{
                      justifyContent: "space-between", fontSize: '14px'
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

                        <span class={"offset-1 mr-auto font-weight-bold"}>
                          {" "}
                          {user.name}
                          <br />
                          <span style={{ fontSize: "12px", color: "#000" }}>
                            {`Distance: ${
                              user.distance < 1
                                ? `${Math.floor(user.distance * 1000)} m`
                                : `${Math.floor(user.distance)} km`
                            }`}
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
                                  closeModal();
                                  setSelectedUser(user);
                                  setShowBasket(true);
                                }}
                                // do not display shopping basket on pocs for bulkbreaker 
                                className = { user.type==='poc' && loggedInUser.type==='bulkbreaker' ? 'd-none': 'd-block' }
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
