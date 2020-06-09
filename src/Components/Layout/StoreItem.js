import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "20px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: "40px",
    objectFit: "contain",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  icon: { color: "red", fontSize: "15" },
}));

const StoreItem = ({ userId, product, setProducts, selectedProducts }) => {
  console.log("Rendering Store Item");
  const classes = useStyles();
  const [quantity, setQuantity] = useState(null);

  const reduceQuantity = () => {
    if (Number(quantity) > 0) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(Number(quantity) + 1);
  };

  useEffect(() => {
    if (quantity === null) {
      return;
    } else if (quantity === 0) {
      console.log("Ki lo n sele");
      const filteredProducts = selectedProducts.filter(
        (selectedProduct) => selectedProduct._id !== product._id
      );
      setProducts(filteredProducts);
    } else {
      const itemExists = selectedProducts.find(
        (selectedProduct) => selectedProduct._id === product._id
      );
      let updatedProducts;
      if (itemExists) {
        updatedProducts = selectedProducts.map((selectedProduct) =>
          selectedProduct._id === product._id
            ? { ...selectedProduct, quantity: quantity }
            : selectedProduct
        );
      } else {
        updatedProducts = [
          ...selectedProducts,
          { ...product, userID: userId, quantity },
        ];
      }
      setProducts(updatedProducts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity, setProducts, userId]);

  return (
    <Card className={classes.root}>
      <img
        src={`${product.image}`}
        alt={`${product.brand} ${product.sku}`}
        className={classes.cover}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5" style={{ fontSize: "13px" }}>
            <div style={{ color: "#b11917", fontWeight: "bold" }}>Brand</div>
            {product.brand} ({product.sku}) {product.volume}
          </Typography>

          <Typography
            variant="subtitle1"
            color="textSecondary"
            style={{ fontSize: "13px" }}
          >
            <div style={{ color: "#b11917", fontWeight: "bold" }}>
              Suggested Price per Case
            </div>
            &#8358;{product.price}
          </Typography>

          <div className={classes.controls}>
            <IconButton aria-label="remove" onClick={reduceQuantity}>
              <RemoveIcon className={classes.icon} />
            </IconButton>
            <span
              style={{
                border: "1px solid black",
                paddingLeft: "15px",
                paddingRight: "15px",
              }}
            >
              {Number(quantity)}
            </span>
            <IconButton aria-label="add" onClick={increaseQuantity}>
              <AddIcon className={classes.icon} />
            </IconButton>
            (Cases)
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default React.memo(StoreItem);