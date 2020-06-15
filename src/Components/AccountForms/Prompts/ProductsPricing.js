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
  const [maxPriceAlert, setMaxPriceAlert] = useState("");

  useEffect(() => {
    setProducts([...serverProducts]);
  }, [serverProducts]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleInputChange = (e, productId, recPrice) => {

    // getting 70% of recommended price
    var minRecPrice = (70/100)*recPrice
    var maxRecPrice = (150/100)*recPrice

    const updatedProducts = products.map((product) => {
      
      (e.target.value < minRecPrice || e.target.value > maxRecPrice)? setMaxPriceAlert('disabled') : setMaxPriceAlert('');
      
      if (product._id === productId) {
        product.price = e.target.value;
      }
    
      return product;
    });

    setProducts([...updatedProducts]);
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
        margin: "2vh auto",
      }}
    >
      <Form onSubmit={handleSubmit}>
        <h6
          style={{
            color: "#b11917",
            textAlign: "center",
            border: "1px solid grey",
            padding: "4px",
            borderRadius: "4px",
          }}
        >
          Select the Products you sell and set your Selling Price
        </h6>
        <p style={{fontSize: '10px', borderRadius: '4px', backgroundColor: '#AADAFF', fontWeight: 'bold'}} className={'text-center text-justify p-1'}>
        Please note! you are expected to input the price you sell each product which will be communicated to your potential customers, if you do not set your price, a recommended selling price will be displayed on your profile for your customers to see
        </p>
        <Row>
          {products.length > 0 &&
            products.map((product) => {
              
              return (
                <Col xs={4} lg={4} md={4} key={product._id}>
                  <ProductCard
                    product={product}
                    handleInputChange={handleInputChange}
                    setMaxPriceAlert={maxPriceAlert}
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
      <span
        style={{ color: "#b11917", fontSize: "13px", fontWeight: "bold" }}
        className={"offset-5"}
      >
        Setup 1 of 4
      </span>
    </Container>
  );
};

export default memo(ProductsPricing);
