import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";

import DeliveryCard from "./DeliveryCard";

const ConfirmDelivery = ({ show, setShow }) => {
  const deliveredOrders = useSelector((state) => {
    return state.order.sentOrders.filter((order) => order.status === "delivered");
  });
  
  const handleClose = () => setShow(false);

  useEffect(() => {
    if(deliveredOrders.length === 0){
      setShow(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveredOrders.length]);

  return (
    <Modal show={show} onHide={handleClose} backdrop keyboard={false} style={{marginTop: "13px"}}>
      {deliveredOrders.map((order) => {
        return <DeliveryCard key={order._id} order={order} close={handleClose} />;
      })}
    </Modal>
  );
};

export default ConfirmDelivery;
