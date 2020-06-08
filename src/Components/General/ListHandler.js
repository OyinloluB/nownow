import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import PhoneIcon from "@material-ui/icons/Phone";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";


import ShoppingBasket from "../Layout/ShoppingBasket";

const ListHandler = ({ show, closeModal, users }) => {
  const [selectedUser, setSelectedUser] = useState({ products: [] });
  const [confirm, setConfirm] = useState('');
  const [showBasket, setShowBasket] = useState(false);

  const { user: loggedInUser } = useSelector((state) => state.auth);

  // fetch("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=mongolian%20grill&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@47.6918452,-122.2226413&key=AIzaSyBneTry7a6XDjUjSBLISxx7Fr6s0AePqVM")
  // .then(res => res.json())
  // .then(
  //   (result) => {
  //     console.log(result)
  //   },
  //   // Note: it's important to handle errors here
  //   // instead of a catch() block so that we don't swallow
  //   // exceptions from actual bugs in components.
  //   (error) => {
      
  //   })


  

  return (
    
    <>
      <ShoppingBasket
        user={selectedUser}
        show={showBasket}
        setShowBasket={setShowBasket}
        alertShow='d-block'
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
          <div className={'row'}>
          <ArrowBackIcon
            style={{
              color: "#b11917",
              fontSize: 20,
              cursor: "pointer",
            }}
            onClick={closeModal}
            className={'col-5'}
          />
          
          <span className={'offset-3 col-4 font-weight-bold'} style={{whiteSpace: 'nowrap'}}>Nearby Customers</span>
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
                        <span style={{backgroundColor: 'green', maxHeight: '6px', minWidth: '7px', borderRadius: '15px', marginTop: '8px'}}>
                          
                        </span>
                      ) : 
                      <span style={{backgroundColor: '#b11917', maxHeight: '6px', minWidth:'7px', borderRadius: '15px', marginTop: '8px'}}>
                      
                    </span>
                        }
                
                      <span class={'offset-1 mr-auto'}> {user.name}</span>
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
                            <WhatsAppIcon
                              style={{ color: "grey", fontSize: 20 }}
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
                              style={{ color: "grey", fontSize: 20 }}
                            />
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
