import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
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
  const [show, setShow] = useState("d-block");
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
    <Card className="searchField p-3" style={{ height: show === 'd-block'? '250px' :  '180px'}}>
        <div  syle={{ textJustify: 'justify', fontWeight: 'bold' }} className={ show } >
          
          <div className={'d-flex mb-1'} style={{color: "#B11917"}} onClick={()=> setShow('d-none') }>
            <span className={'mr-auto font-weight-bold'}>Close Marker Orientation</span>
            <VisibilityOffIcon />
          </div>

          <div className={'d-flex'} style={{color: "grey"}}>
            <span className={'mr-auto font-weight-bold'}>Distributor</span>
            <span><img src="https://static.thenounproject.com/png/462-200.png" alt="" width="20" height="20" /></span>
          </div>
          <div className={'d-flex font-weight-bold'} style={{color: "grey"}}>
            <span className={'mr-auto'}>Bulkbreaker</span>
            <span><img src="https://iconsetc.com/icons-watermarks/simple-green/raphael/raphael_location/raphael_location_simple-green_512x512.png" alt="" width="20" height="20" /></span>
          </div>
          <div className={'d-flex font-weight-bold pb-1'} style={{color: "grey", borderBottom: '1px solid grey'}}>
            <span className={'mr-auto'}>Retail Store</span>
            <span><img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png" alt="" width="20" height="20" /></span>
          </div>
        </div> 

        <div className={ show === 'd-none'? 'd-block d-flex':'d-none' } style={{color: "green"}} onClick={()=> setShow('d-block')} >
          <span className={'mr-auto'}>Open Marker Orientation</span>
          <VisibilityIcon />
        </div>
     

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
