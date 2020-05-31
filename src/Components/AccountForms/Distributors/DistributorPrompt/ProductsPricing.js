import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Form, Button } from "react-bootstrap";
import Trophy from "../../../../assets/TrophyRGB.png";

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
}));

export default function ProductsPricing({ setCurrentPage, setPricingDetails }) {
  const classes = useStyles();
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
    setPricingDetails({
      price,
    });
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
        <Card className={classes.root}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                Trophy{" "}
                <span
                  style={{
                    color: "#b11917",
                  }}
                >
                  (RGB)
                </span>
              </Typography>
              <br />
              <div>
                <Form.Group controlId="formBasicPrice">
                  <Form.Control
                    type="number"
                    placeholder="Input Price"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Group>
                <button
                  style={{
                    backgroundColor: "#b11917",
                    color: "white",
                    border: "none",
                    width: "100%",
                    padding: "10px",
                    margin: "10px 0 10px 0",
                  }}
                >
                  Submit
                </button>
              </div>
            </CardContent>
          </div>
          <CardMedia
            className={classes.cover}
            image={Trophy}
            title="Live from space album cover"
          />
        </Card>
        <br />
        <p
          style={{
            color: "#b11917",
          }}
        >
          Next Product
          <NavigateNextIcon />
        </p>
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
}
