import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import PhoneIcon from "@material-ui/icons/Phone";
import BlurOffRoundedIcon from "@material-ui/icons/BlurOffRounded";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShoppingBasket from "../Layout/ShoppingBasket";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

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
            alignItems: "center",
          }}
        >
          <ArrowBackIcon
            style={{
              color: "#b11917",
              fontSize: 20,
              cursor: "pointer",
            }}
            onClick={closeModal}
          />
          <h6
            style={{
              textAlign: "center",
            }}
          >
            Distributors nearby
          </h6>
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
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "1rem",
                        borderBottom: "1px solid #f7f7f7",
                      }}
                    >
                      {user.name}
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
                            <WhatsAppIcon style={{ color: "grey", fontSize: 20 }} />
                          </a>
                        </span>
                        <span>
                          {" "}
                          <a
                            href={`tel:${user.phone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <PhoneIcon style={{ color: "grey", fontSize: 20 }} />
                          </a>
                        </span>
                        {loggedInUser.type !== "distributor" ? (
                          <span>
                            <ShoppingCartIcon
                              style={{
                                color: "grey",
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

export default ListHandler;
