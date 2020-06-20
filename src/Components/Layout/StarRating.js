import React, { useState } from "react";

import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Typography, Box, Button } from "@material-ui/core";

const StarRating = ({ rateOrder, setShowRating, close }) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (e, val) => {
    setRating(val);
  };
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding: "1.5rem",
        marginTop: "20px"
      }}
    >
      <Box component="fieldset" mb={3} borderColor="transparent">
        <>
          <Typography component="legend" style={{textAlign: "center", fontSize:"13px"}}>Rate Your Order</Typography>
          <Rating
            name="rating"
            onChange={handleRatingChange}
            defaultValue={rating}
            precision={0.5}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
            size="large"
            style={{
              display:"flex",
              justifyContent:"center"
            }}
          />
        </>
        <>
          <Typography component="legend" style={{textAlign: "center", fontSize:"13px"}}>Leave a review</Typography>
          <form>
            <input
              type="text"
              style={{
                marginTop: "10px",
                padding: "8px",
                borderRadius: "15px",
                border: "1px solid black",
                width: "310px",
                height: "121px",
              }}
            />
          </form>
        </>
      </Box>
      <Button
        variant="contained"
        onClick={() => {
          rateOrder(rating);
          close();
        }}
        style={{ backgroundColor: "#b11917", color: "#fff" }}
      >
        Submit
      </Button>
    </div>
  );
};

export default StarRating;
