import React from "react";
import { ListGroup } from "react-bootstrap";

const itemStyles = {
  marginBottom: "0rem",
  fontSize: "14px",
  padding: "0.4rem 0.25rem",
};

const ConfirmDeliveryItem = ({ item }) => {
  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item style={itemStyles}>
             <div className={'d-flex font-weight-bold'} style={{color: '#B11917'}}><span className={'text-dark'}>Brand Name: </span><span className={'ml-auto'}></span>{item.details.brand} &nbsp; </div>
             <div className={'d-flex font-weight-bold'} style={{color: '#B11917'}}><span className={'mr-auto text-dark'}>Quantity: </span>{item.quantity} </div>
             <div className={'d-flex font-weight-bold'} style={{color: '#B11917'}}><span className={'mr-auto text-dark'}>Price: </span>&#8358; {item.details.price}</div>
        </ListGroup.Item>

      </ListGroup>
    </>
  );
};

export default ConfirmDeliveryItem;
