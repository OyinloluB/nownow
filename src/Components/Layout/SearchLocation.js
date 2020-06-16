import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card } from "react-bootstrap";

import "./Search.css";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import { setCoordinates } from "../../redux/auth/auth.actions";
import { getAddressCoordinates } from "../../helpers/google-maps";

const useStyles = makeStyles(() => ({
  root: {
    "& > *": {
      width: "100%",
    },
  },
}));

const SearchLocation = () => {
  const [search, setSearch] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const coordinates = await getAddressCoordinates(search);
    if (coordinates) {
      const { lat, lng } = coordinates;
      dispatch(setCoordinates({ lat, lng }));
    }
  };

  return (
    <Card className="searchField">
      <Card.Body>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="standard-basic"
            label="Search for nearby stores"
            onChange={handleChange}
          />
          <button
            type="submit"
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
