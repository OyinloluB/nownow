import React from "react";
import { Form } from "react-bootstrap";

export const SelectDropdown = () => {
  return (
    <Form>
      <Form.Group controlId="exampleForm.SelectCustom">
        <Form.Label
          style={{
            paddingRight: "10px",
          }}
        >
          {" "}
          Mark all the items in this order as:
        </Form.Label>
        <Form.Control
          as="select"
          custom
          style={{
            width: "230px",
          }}
        >
          <option>Select</option>
          <option>Accepted</option>
          <option>Declined</option>
          <option>Delivered</option>
        </Form.Control>
      </Form.Group>
    </Form>
  );
};
