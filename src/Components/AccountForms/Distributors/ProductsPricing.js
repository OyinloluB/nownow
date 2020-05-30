import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Form, Button } from "react-bootstrap";
import Trophy from "../../../assets/TrophyRGB.png";

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

export default function ProductsPricing() {
  const classes = useStyles();
  const theme = useTheme();

  return (
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
              <Form.Control type="number" placeholder="Input Price" />
            </Form.Group>
            <Button
              type="submit"
              style={{
                backgroundColor: "#b11917",
                border: "none",
                width: "100%",
                margin: "10px 0 10px 0",
              }}
            >
              Submit
            </Button>
          </div>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        image={Trophy}
        title="Live from space album cover"
      />
    </Card>
  );
}
