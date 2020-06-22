import React from "react";
import EachOrderContent from "../Layout/EachOrderContent";
import OrderIntro from "../Layout/OrderIntro";

const ReceivedOrders = ({
  receivedOrders,
  currentOrder,
  switchReceived,
  orderStatus,
  setCurrentOrder,
  handleStatusUpdate,
}) => {
  const totalQuantity = currentOrder.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const filterOrders = (order) => {
    if(orderStatus.status === "all"){
      return true;
    } else if (orderStatus.status === "delivered"){
      return order.status === "delivered" || order.status === "confirmed";
    } else {
      return orderStatus.status === order.status;
    }
  }
  return (
    <div className={switchReceived}>
      {currentOrder.items.length > 0
        ? currentOrder.items.map((item) => {
            return (
              <OrderIntro
                key={item._id}
                item={item}
                status={currentOrder.status}
                totalQuantity={totalQuantity}
              />
            );
          })
        : receivedOrders.length > 0
        ? receivedOrders
            .filter((order) => filterOrders(order))
            .map((order) => {
              return (
                <EachOrderContent
                  key={order._id}
                  order={order}
                  setOrder={setCurrentOrder}
                />
              );
            })
        : null}
      {currentOrder.items.length > 0 && currentOrder.status === "new" ? (
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "space-between",
            marginBottom: "35px",
          }}
        >
          <button
            onClick={() => handleStatusUpdate("processing")}
            style={{
              color: "white",
              fontWeight: "bold",
              padding: "10px",
              marginTop: "20px",
              marginBottom: "100%",
              width: "40%",
              border: "none",
              background: "green",
            }}
          >
            Accept
          </button>
          <button
            onClick={() => handleStatusUpdate("declined")}
            style={{
              color: "white",
              fontWeight: "bold",
              padding: "10px",
              marginTop: "20px",
              marginBottom: "100%",
              width: "40%",
              border: "none",
              background: "#b11917",
            }}
          >
            Decline
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(ReceivedOrders);
