import React from "react";
import EachOrderContent from "../Layout/EachOrderContent";
import OrderIntro from "../Layout/OrderIntro";

const SentOrders = ({
  sentOrders,
  currentOrder,
  setCurrentOrder,
  switchSent,
  orderStatus,
  handleStatusUpdate,
}) => {
  return (
    <div className={switchSent}>
      {currentOrder.items.length > 0
        ? currentOrder.items.map((item) => {
            return (
              <OrderIntro key={item._id} item={item} status={currentOrder.status} />
            );
          })
        : sentOrders.length > 0
        ? sentOrders
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
            onClick={() => handleStatusUpdate("cancelled")}
            style={{
              color: "white",
              fontWeight: "bold",
              padding: "10px",
              marginTop: "20px",
              width: "100%",
              border: "none",
              background: "#b11917",
            }}
          >
            Cancel Order
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(SentOrders);
