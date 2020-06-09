import React from "react";
import { Row, Col, Card } from "react-bootstrap";

const OrderItem = ({ receivedOrders }) => {
  console.log(receivedOrders);
  return (
    <div>
      <Card style={{ width: "100%" }}>
        <Card.Body>
          {receivedOrders.map((item) =>
            item ? (
              <Row
                style={{
                  borderBottom: "1px solid rgb(223, 223, 223)",
                  paddingBottom: "9px",
                }}
              >
                <Col xs={3} md={3} lg={3}>
                  <Card.Text>
                    <img src={item.items[0].details.image} width="30px" />
                  </Card.Text>
                </Col>
                <Col xs={3} md={6} lg={6}>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                </Col>
                <Col xs={3} md={3} lg={3}>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.``
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
