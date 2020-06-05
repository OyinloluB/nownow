import React from "react";

const OrderItem = ({ receivedOrders }) => {
  console.log(receivedOrders);
  return (
    <div>
      {receivedOrders.map((item) =>
        item ? (
          <>
            <p>{item.items[0].details.brand}</p>{" "}
            <img src={item.items[0].details.image} />
          </>
        ) : (
          ""
        )
      )}
    </div>
  );
};

export default OrderItem;
