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
  const [maxPriceAlert,setMaxPriceAlert] = useState('')

  useEffect(() => {
    setProducts([...serverProducts]);
  }, [serverProducts]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleInputChange = (e, productId) => {
    const updatedProducts = products.map((product) => {

      (e.target.value > Number(product.recommendedPrice.substring(1).replace(",","")))? setMaxPriceAlert('Your Product Price is beyond the Recommended Price!') : setMaxPriceAlert('');
      
      if (product._id === productId) {
        product.price = e.target.value; 
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
        margin: "5vh auto",
      }}
    >
     
      <Form onSubmit={handleSubmit}>
        <h6
          style={{
            color: "#b11917",
            textAlign: "center",
            border: '1px solid grey',
            padding: '4px',
            borderRadius: '4px',
          }}
        >
          Select the Brand/SKU you sell and set your Selling Price
        </h6>
        <br />
        <Row>
          {products.map((product) => {
            return (
              <Col xs={4} lg={4} md={4}>
                <ProductCard
                  product={product}
                  handleInputChange={handleInputChange}
                  key={product._id}
                  setMaxPriceAlert = {maxPriceAlert}
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
      <span style={{color: '#b11917', fontSize: '13px', fontWeight: 'bold'}} className={'offset-5'}>Page 1 of 4</span>
    </Container>
  );
};

export default memo(ProductsPricing);
