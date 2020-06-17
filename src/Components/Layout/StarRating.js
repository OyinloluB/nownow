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
      }}
    >
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Rate Your Order</Typography>
        <Rating
          name="rating"
          onChange={handleRatingChange}
          defaultValue={rating}
          precision={0.5}
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
          size="large"
        />
      </Box>
      <Button
        variant="contained"
        onClick={() => {
          rateOrder(rating);
          close()
        }}
        style={{ backgroundColor: "#b11917", color: "#fff" }}
      >
        Submit
      </Button>
    </div>
  );
};

export default StarRating;
