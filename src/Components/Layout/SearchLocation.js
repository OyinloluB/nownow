import React from "react";
import { Card } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "100%",
    },
  },
}));

const SearchLocation = () => {
  const classes = useStyles();

  return (
    <Card
      style={{
        width: "350px",
        position: "fixed",
        bottom: "0",
        right: "0",
      }}
    >
      <Card.Body>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="standard-basic" label="Search for nearby stores" />
          <button
            style={{
              borderRadius: "25px",
              padding: "5px",
              backgroundColor: "#b11917",
              border: "1px solid #b11917",
              color: "white",
              marginTop: "3vh",
              paddingBottom: "2vh",
            }}
          >
            Find nearby stores
          </button>
        </form>
      </Card.Body>
    </Card>
  );
};

export default SearchLocation;
