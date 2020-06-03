import React, { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../../../redux/product/product.actions";
import Container from "@material-ui/core/Container";
// import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Form, Button, Row, Col } from "react-bootstrap";
import ProductCard from "../../Layout/ProductCard";

const ProductsPricing = ({ setCurrentPage, setProductsDetails }) => {
  const { products: serverProducts } = useSelector((state) => state.product);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setProducts([...serverProducts]);
  }, [serverProducts]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleInputChange = (e, productId) => {
    const updatedProducts = products.map((product) => {
      if (product._id === productId) {
        product.price = e.target.value;
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
    setProductsDetails([...products]);
    setCurrentPage(2);
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        overflow: "auto",
        margin: "15vh auto",
      }}
    >
      <Form onSubmit={handleSubmit}>
        <h5
          style={{
            color: "#b11917",
            textAlign: "center",
          }}
        >
          Select the brand and SKU you sell and set your selling price below
        </h5>
        <br />
        <Row>
          {products.map((product) => {
            return (
              <Col xs={4} lg={3} md={3}>
                <ProductCard
                  product={product}
                  handleInputChange={handleInputChange}
                  key={product._id}
                />
              </Col>
            );
          })}
        </Row>
        <br />
        <Button
          type="submit"
          style={{
            backgroundColor: "#b11917",
            border: "none",
            width: "100%",
            margin: "10px 0 10px 0",
          }}
        >
          Next
        </Button>
      </Form>
    </Container>
  );
};

export default memo(ProductsPricing);
