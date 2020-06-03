import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Trophy from "../../assets/TrophyRGB.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
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

const BasketContent = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
      <img src={Trophy} alt="product-image" className={classes.cover} />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            Live From Space
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Mac Miller
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton aria-label="add">
            <AddIcon style={{ color: "red", fontSize: "15" }} />
          </IconButton>
          <span>0</span>
          <IconButton aria-label="next">
            <RemoveIcon style={{ color: "red", fontSize: "15" }} />
          </IconButton>
        </div>
      </div>
    </Card>
  );
};

export default BasketContent;
