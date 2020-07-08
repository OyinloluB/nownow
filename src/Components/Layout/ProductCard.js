import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Row } from "react-bootstrap";
import ShowPricing from "../AccountForms/Prompts/ShowPricing";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import "./ProductCard.css";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    justifyContent: "center",
    marginBottom: "10px",
  },
  details: {
    display: "flex",
    justifyContent: "center",
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

const ProductCard = ({ product, handleInputChange, setMaxPriceAlert }) => {
  const classes = useStyles();
  const [showContent, setShowContent] = useState(false);
  return (
    <>
      <ShowPricing
        show={showContent}
        setShowContent={setShowContent}
        product={product}
        handleInputChange={handleInputChange}
        setMaxPriceAlert={setMaxPriceAlert}
      />

      <div className={[classes.root, "stem"].join(" ")} onClick={() => setShowContent(true)} >
        <Row className={classes.details}>
          {product.image ? (
            <>
            { product.price && setMaxPriceAlert === '' ? <CheckCircleOutlineIcon style={{color: 'green'}} className={'offset-3'}/> : <CheckCircleOutlineIcon style={{color: '#fff'}} className={'offset-3'}/> }
              <img
                src={product.image}
                alt={`${product.brand} ${product.sku}`}
                style={{
                  width: "100%",
                  maxHeight: "80px",
                  objectFit: "contain",
                }}
              />
              <p
                style={{
                  fontSize: "13px",
                  textAlign: "center",
                  fontWeight: 'bold',
                  padding:'5px'
                }}
              >
                {" "}
                {`${product.brand} `}
                <span
                  style={{
                    color: "#b11917",
                    fontWeight: 'bold',
                    
                  }}
                >
                  {`${product.volume} (${product.sku})`}
                </span>
              </p>
            </>
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
        </Row>
      </div>
    </>
  );
};

export default ProductCard;
