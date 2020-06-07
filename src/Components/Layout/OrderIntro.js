import React from "react";
import { Row, Col, Card } from "react-bootstrap";

const OrderIntro = ({ item, status }) => {
  return (
    <div>
      <Card style={{ width: "100" }}>
        <Card.Body>
          <Row
            style={{
              // borderBottom: "1px solid rgb(223, 223, 223)",
              paddingBottom: "9px",
              padding: "9px",
            }}
          >
            <Col xs={3} md={3} lg={3}>
              <Card.Text>
                <img src={item.details.image} width="30px" alt="Item" />
              </Card.Text>
            </Col>
            <Col xs={8} md={6} lg={6}>
              <Card.Text>
                <h6>{item.details.brand}</h6>
                <ul
                  style={{
                    listStyle: "none",
                    paddingLeft: "0rem",
                    fontSize: "14px",
                  }}
                >
                  <li>
                    <b>Unit Price: </b>
                    {item.details.price}
                  </li>
                  <li>
                    <b>Quantity: </b>
                    {item.quantity}
                  </li>
                  <li>
                    <b>Cost: </b>
                    {`${item.quantity * item.details.price}`}
                  </li>
                  <li>
                    <b>Placed On: </b>
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </li>
                  <li>
                    <b>Status: </b>
                    {status}
                  </li>
                </ul>
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default OrderIntro;
