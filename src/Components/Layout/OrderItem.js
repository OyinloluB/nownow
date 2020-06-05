import React from "react";
import { Row, Col, Card } from "react-bootstrap";

const OrderItem = ({ receivedOrders }) => {
  console.log(receivedOrders);
  return (
    <div>
      <Card style={{ width: "100" }}>
        <Card.Body>
          {receivedOrders.map((item) =>
            item ? (
              <Row
                style={{
                  borderBottom: "1px solid rgb(223, 223, 223)",
                  paddingBottom: "9px",
                  padding: "9px",
                }}
              >
                <Col xs={3} md={3} lg={3}>
                  <Card.Text>
                    <img src={item.items[0].details.image} width="30px" />
                  </Card.Text>
                </Col>
                <Col xs={3} md={6} lg={6}>
                  <Card.Text>
                    <h6>{item.items[0].details.brand}</h6>
                    <ul
                      style={{
                        listStyle: "none",
                        paddingLeft: "0rem",
                      }}
                    >
                      <li>
                        <b>Unit Price: </b>
                        {item.items[0].details.price}
                      </li>
                      <li>
                        <b>Quantity: </b>
                      </li>
                      <li>
                        <b>Cost:</b>
                      </li>
                      <li>
                        <b>Placed On: </b>
                      </li>
                      <li>
                        <b>Delivered On: </b>
                      </li>
                    </ul>
                  </Card.Text>
                </Col>
                <Col xs={3} md={3} lg={3}>
                  <Card.Text
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <button
                      style={{
                        backgroundColor: "#00FF00",
                        border: "1px solid #00FF00",
                        color: "white",
                        padding: "8px",
                      }}
                    >
                      Accept
                    </button>
                    <br />
                    <button
                      style={{
                        backgroundColor: "#b11917",
                        border: "1px solid #b11917",
                        color: "white",
                        padding: "8px",
                      }}
                    >
                      Decline
                    </button>
                  </Card.Text>
                </Col>
              </Row>
            ) : (
              ""
            )
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default OrderItem;
