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
  return (
    <div className={switchReceived}>
      {currentOrder.items.length > 0
        ? currentOrder.items.map((item) => {
            return (
              <OrderIntro key={item._id} item={item} status={currentOrder.status} />
            );
          })
        : receivedOrders.length > 0
        ? receivedOrders
            .filter((order) =>
              orderStatus.status === "all"
                ? true
                : orderStatus.status === order.status
            )
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
