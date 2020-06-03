import React, { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../../../redux/product/product.actions";
import Container from "@material-ui/core/Container";
// import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Form, Button } from "react-bootstrap";
import ProductCard from "../../Layout/ProductCard";

const ProductsPricing = ({
  setCurrentPage,
  setProductsDetails,
}) => {
  const { products: serverProducts } = useSelector((state) => state.product);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() =>{
    setProducts([...serverProducts]);
  },[serverProducts]);

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
        margin: "15vh auto 10vh auto",
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
        {products.map((product) => {
          return (
            <ProductCard
              product={product}
              handleInputChange={handleInputChange}
              key={product._id}
            />
          );
        })}
        <br />
        {/* <p
          style={{
            color: "#b11917",
          }}
        >
          Next Product
          <NavigateNextIcon />
        </p> */}
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
