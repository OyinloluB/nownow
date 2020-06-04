import React from "react";
import { useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";

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

export const ViewBasket = ({ show, setViewBasket }) => {
  const classes = useStyles();
  const handleClose = () => setViewBasket(false);

  const { items } = useSelector((state) => state.cart);

  const handleSubmit = () => {
    fetch('')
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        {items.map((product) => (
          <Card className={classes.root}>
            <img
              src={`${product.image}`}
              alt={`${product.brand} ${product.sku}`}
              className={classes.cover}
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  {product.brand} ({product.sku})
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {product.volume}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Price: &#8358;{product.price}
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <IconButton aria-label="remove">
                  <RemoveIcon className={classes.icon} />
                </IconButton>
                <span>number</span>
                <IconButton aria-label="add">
                  <AddIcon className={classes.icon} />
                </IconButton>
              </div>
              <Button
                style={{
                  backgroundColor: "#f7f7f7",
                  color: "#b11917",
                  border: "none",
                  display: "flex",
                  justifyContent: "space-around",
                }}
                // onClick={handleRemoveFromCart}
              >
                <RemoveShoppingCartIcon
                  style={{ color: "#b11917", fontSize: "20" }}
                />
              </Button>
              <br />
            </div>
          </Card>
        ))}
        <div
          style={{
            textAlign: "right",
            width: "100%",
          }}
        >
          <h5>
            Total: <span>&#8358;500</span>
          </h5>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleClose}
          style={{
            backgroundColor: "#b11917",
            border: "none",
          }}
        >
          Close
        </Button>
        <Button
          onClick = {handleSubmit}
          style={{
            backgroundColor: "#b11917",
            border: "none",
          }}
        >
          Checkout <ShoppingCartIcon />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
