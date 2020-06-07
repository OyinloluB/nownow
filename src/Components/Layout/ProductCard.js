import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import Typography from "@material-ui/core/Typography";
// import { Form } from "react-bootstrap";
import ShowPricing from "../AccountForms/Prompts/ShowPricing";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: "55px",
    marginRight: "10px",
    objectFit: "cover",
    // backgroundImage: "url('../../)"
  },
}));

const ProductCard = ({ product, handleInputChange }) => {
  const classes = useStyles();
  const [showContent, setShowContent] = useState(false);
  return (
    <>
      <ShowPricing
        show={showContent}
        setShowContent={setShowContent}
        product={product}
        handleInputChange={handleInputChange}
      />

      <Card className={classes.root} onClick={() => setShowContent(true)}>
        <div className={classes.details}>
          <CardContent
            className={classes.content}
            style={{
              width: "100px",
              height: "100px",
              backgroundImage: "linear-gradient(to right())",
            }}
          >
            {product.image ? (
              <img
                src={product.image}
                alt={`${product.brand} ${product.sku}`}
                style={{
                  width: "100%",
                }}
              />
            ) : (
              <p
                style={{
                  fontSize: "12px",
                  color: "#b11917",
                  textAlign: "center",
                }}
              >
                {product.brand}, {product.sku} ({product.volume})
              </p>
            )}
          </CardContent>
        </div>
      </Card>
    </>
  );
};

export default ProductCard;
