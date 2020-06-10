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
        // product_ = product_.substring(2)
        let product_ = product.recommendedPrice.split(',')

        product_ = product_.join('')
        product_ = product_.substring(1);
// str.splice(3, 1)
        // console.log(product_)
        // if(product_ < e.target.value){
          product.price = e.target.value;  
        // }
        // else{
        //   alert("Your price is beyond the Recommended Price!")
        // }
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedProducts = products.filter((product) =>
      Boolean(product.price)
    );
    if (selectedProducts.length < 1) {
      alert("Please select a product");
    } else {
      console.log("Submitted");
      setProductsDetails([...selectedProducts]);
      setCurrentPage(2);
    }
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
          Select the Brand/SKU you sell and set your Selling Price
        </h5>
        <br />
        <Row>
          {products.map((product) => {
            return (
              <Col xs={4} lg={4} md={4}>
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
