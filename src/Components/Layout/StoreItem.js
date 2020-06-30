import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    padding: "0px",
    margin: "0px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
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
  icon: { color: "red", fontSize: "15px", fontWeight: "bold" },
}));

const StoreItem = ({ userId, product, setProducts, selectedProducts, userName }) => {
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

  const handleChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  useEffect(() => {
    if (quantity === null) {
      return;
    } else if (quantity === 0) {
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
          { ...product, userID: userId, quantity, userName: userName },
        ];
      }
      setProducts(updatedProducts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity, setProducts, userId, userName]);

  return (
    <li className={"list-group-item row"}>
      <div className={"d-flex"}>
        <img
          src={`${product.image}`}
          alt={`${product.brand} ${product.sku}`}
          style={{
            width: "20%",
            height: "70px",
            objectFit: "contain",
          }}
          className={classes.cover}
        />
        <div
          className={"ml-auto col-8 font-weight-bold"}
          style={{ fontSize: "13px", color: "#b11917" }}
        >
          {product.brand} ({product.sku}) {product.volume}
          <div style={{ color: "grey", fontWeight: "bold" }} className={"d-flex mt-1"}>
            Price per Case <span className={"ml-auto"}>&#8358; {product.price}</span>
          </div>
          <div
            style={{ color: "grey", fontWeight: "bold" }}
            className={"d-flex mt-1"}
          >
            Quantity{" "}
            <span
              style={{ color: "grey", fontSize: "8px" }}
              className={"offset-1 offset-md-5"}
            >
              <IconButton
                aria-label="remove"
                onClick={reduceQuantity}
                style={{
                  padding: "0px",
                  borderRadius: "0px",
                  border: "1px solid #b11917",
                }}
              >
                <RemoveIcon className={classes.icon} />
              </IconButton>
              <span style={{ padding: "7px", fontSize: "14px" }} className={""}>
                <input
                  type="number"
                  value={Number(quantity) === 0 ? "" : Number(quantity)}
                  className={"col-4 col-md-5 p-0 mt-1"}
                  name="qty"
                  onChange={handleChange}
                  style={{ maxHeight: "20px" }}
                />
              </span>
              <IconButton
                aria-label="add"
                onClick={increaseQuantity}
                style={{
                  padding: "0px",
                  borderRadius: "0px",
                  border: "1px solid #b11917",
                }}
              >
                <AddIcon className={classes.icon} />
              </IconButton>
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default React.memo(StoreItem);
