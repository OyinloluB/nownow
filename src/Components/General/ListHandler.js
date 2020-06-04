import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import PhoneIcon from "@material-ui/icons/Phone";
import AllOutIcon from "@material-ui/icons/AllOut";
import BlurOffRoundedIcon from "@material-ui/icons/BlurOffRounded";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import ShoppingBasket from "../Layout/ShoppingBasket";

const ListHandler = ({ show, closeModal, users }) => {
  const [selectedUser, setSelectedUser] = useState({ products: [] });
  const [showBasket, setShowBasket] = useState(false);

  const { user: loggedInUser } = useSelector((state) => state.auth);

  return (
    <>
      <ShoppingBasket
        user={selectedUser}
        show={showBasket}
        setShowBasket={setShowBasket}
      />
      <Modal show={show} onHide={closeModal}>
        <Modal.Header style={{ color: "white", background: "#b11917" }}>
          <h5>Nearby Customers </h5>
        </Modal.Header>

        <Modal.Body>
          <ul
            style={{
              paddingLeft: "0rem",
            }}
          >
            {users
              .filter((user) => user.products.length > 0)
              .map((user) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <li
                      key={user.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      {user.name}
                      <div>
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            width: "20%",
                          }}
                        >
                          <a
                            href={`https://wa.me/${user.phone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <WhatsAppIcon
                              style={{ color: "lemon", fontSize: 20 }}
                            />
                          </a>
                        </span>
                        <span>
                          {" "}
                          <a
                            href={`tel:${user.phone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <PhoneIcon
                              style={{ color: "blue", fontSize: 20 }}
                            />
                          </a>
                        </span>
                        {loggedInUser.type !== "distributor" ? (
                          <span>
                            <ShoppingCartIcon
                              style={{
                                color: "#b11917",
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

        <Modal.Footer>
          <button
            className="btn"
            style={{ background: "#b11917", color: "white" }}
            onClick={closeModal}
          >
            <BlurOffRoundedIcon /> Away
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ListHandler;
