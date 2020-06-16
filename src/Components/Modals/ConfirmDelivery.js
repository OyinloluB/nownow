import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";

import DeliveryCard from "./DeliveryCard";

const ConfirmDelivery = ({ show, setShow }) => {
  const deliveredOrders = useSelector((state) => {
    return state.orders.sentOrders.filter((order) => order.status === "delivered");
  });
  
  const handleClose = () => setShow(false);

  useEffect(() => {
    if(deliveredOrders.length === 0){
      setShow(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveredOrders.length]);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      {deliveredOrders.map((order) => {
        return <DeliveryCard key={order._id} order={order} />;
      })}
    </Modal>
  );
};

export default ConfirmDelivery;
