import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Form, Button } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
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
  },
}));

const ProductCard = ({ product, handleInputChange }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {`${product.brand} `}
            <span
              style={{
                color: "#b11917",
              }}
            >
              {`${product.volume} (${product.sku})`}
            </span>
          </Typography>
          <br />
          <div>
            <Form.Group controlId="formBasicPrice">
              <Form.Control
                type="number"
                placeholder="Input Price"
                onChange={(e) => handleInputChange(e, product._id)}
              />
            </Form.Group>
          </div>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        image={product.image}
        title="Live from space album cover"
      />
    </Card>
  );
};

export default ProductCard;
