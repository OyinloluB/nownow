import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import PhoneIcon from "@material-ui/icons/Phone";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Geocoder from "react-native-geocoding";
import ShoppingBasket from "../Layout/ShoppingBasket";

const ListHandler = ({ show, closeModal, users }) => {
  const [selectedUser, setSelectedUser] = useState({ products: [] });
  const [confirm, setConfirm] = useState("");
  const [showBasket, setShowBasket] = useState(false);

  const { user: loggedInUser } = useSelector((state) => state.auth);
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

        <Modal.Body>
          <ul
            style={{
              paddingLeft: "0rem",
            }}
          >
            {users
              .filter((user) => user.products.length > 0)
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
                    )
                      .then((response) => response.json())
                      .then((responseJson) => {
                        // forcing the fetched address into the users data
                          user.address = responseJson.results[0].formatted_address;
                      });
                    }

                return (
                  <div
                    key={user.id}
                    style={{
                      justifyContent: "space-between",
                    }}
                  >
                    <li
                      key={user.id}
                      className={'list-group'}
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderBottom: "1px solid #f7f7f7",
                      }}
                    >
                      <div className={'d-flex'}>
                      {user.confirmed === true ? (
                        <span
                          style={{
                            backgroundColor: "green",
                            maxHeight: "6px",
                            minWidth: "7px",
                            borderRadius: "15px",
                            marginTop: "8px",
                          }}
                        ></span>
                      ) : (
                        <span
                          style={{
                            backgroundColor: "#b11917",
                            maxHeight: "6px",
                            minWidth: "7px",
                            borderRadius: "15px",
                            marginTop: "8px",
                          }}
                        ></span>
                      )}

                      <span class={"offset-1 mr-auto"}> {user.name}</span>
                      <div
                        style={{
                          // display: "flex",
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
                            className={'ml-2'}
                          >
                            <PhoneIcon style={{ color: "black", fontSize: 20 }} />
                          </a>
                        </span>
                        {loggedInUser.type !== "distributor" ? (
                          <span className={'ml-2'}>
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
                      <div className={'col-10 text-justify d-block'}>
                        <span style={{fontSize: '12px', color: '#B11917'}} className={'col-12 ml-2 ml-md-3 d-block'}>{user.address}</span>
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

export default ListHandler;
