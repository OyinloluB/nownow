import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import PhoneIcon from "@material-ui/icons/Phone";
import AllOutIcon from "@material-ui/icons/AllOut";
import BlurOffRoundedIcon from "@material-ui/icons/BlurOffRounded";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import ShoppingBasket from "../Layout/ShoppingBasket";

const ListHandler = ({ show, closeModal, users }) => {
  const [selectedUser, setSelectedUser] = useState({ products: [] });
  const [showBasket, setShowBasket] = useState(false);

  return (
    <>
      <ShoppingBasket
        user={selectedUser}
        show={showBasket}
        setShowBasket={setShowBasket}
      />
      <Modal isOpen={show} onHide={closeModal}>
        <ModalHeader
          style={{ color: "white", background: "#b11917" }}
          className="p-3 m-1"
        >
          <AllOutIcon />
          <AllOutIcon /> Nearby Customers <AllOutIcon />
          <AllOutIcon />
        </ModalHeader>

        <ModalBody style={{ maxHeight: "calc(100vh - 210px)", overflowY: "auto" }}>
          <table className="table table-borderless text-justify col-12">
            {users
              .filter((user) => user.products.length > 0)
              .map((user) => {
                return (
                  <tr
                    key={user.id}
                    className="row"
                    style={{ borderBottom: "1px solid grey" }}
                  >
                    <td
                      style={{ color: "grey", fontSize: "14px" }}
                      className="mb-1 pb-1 col-8"
                    >
                      {user.name}
                    </td>
                    <td>
                      <a
                        href={`https://wa.me/${user.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <WhatsAppIcon style={{ color: "lemon", fontSize: 20 }} />
                      </a>
                    </td>
                    <td>
                      <a
                        href={`tel:${user.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <PhoneIcon style={{ color: "blue", fontSize: 20 }} />
                      </a>
                    </td>
                    <td>
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
                    </td>
                  </tr>
                );
              })}
          </table>
        </ModalBody>

        <ModalFooter>
          <button
            className="btn"
            style={{ background: "#b11917", color: "white" }}
            onClick={closeModal}
          >
            <BlurOffRoundedIcon /> Away
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ListHandler;
