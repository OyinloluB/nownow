import React, { useState } from "react";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import UserGuide from "../Carosel/UserGuide";
import axios from "../../helpers/axios-client";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #b11917",
    borderRadius: "5px",
  },
  paper: {
    backgroundColor: "#b11917",
    border: "1px solid white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "5px",
  },
}));

const StatusModal = ({ open, setOpen, callback, comingFrom }) => {
  const user = useSelector((state) => state.auth.user);
  const [colorYes, setColorYes] = useState("green");
  const [myStatus, setMyStatus] = useState("");
  const [colorNo, setColorNo] = useState("#B11917");
  const [ readUserGuide, setReadUserGuide ] = useState(false);

  const classes = useStyles();

  const toggleStatus = async (status) => {
    if (status) {
      setColorYes("grey");
      if(comingFrom==='login') {
        setMyStatus(status);
        setReadUserGuide(true);
      }
      else {
        try {
            let userTypeRoute;
            if (user.type === "distributor") {
              userTypeRoute = "Distributor";
            } else if (user.type === "bulkbreaker") {
              userTypeRoute = "BulkBreaker";
            } else if (user.type === "poc") {
              userTypeRoute = "Poc";
            }
            await axios.patch(`/${userTypeRoute}/${user.id}`, { confirmed: status });
            setOpen(false);
            if(callback) callback();
          } catch (error) {
            console.log("Error updating status", error);
          }
      }
    }
    else {
      setColorNo("grey");
      if(comingFrom==='login') {
        setMyStatus(status);
        setReadUserGuide(true);
      }
      else {
        try {
          let userTypeRoute;
          if (user.type === "distributor") {
            userTypeRoute = "Distributor";
          } else if (user.type === "bulkbreaker") {
            userTypeRoute = "BulkBreaker";
          } else if (user.type === "poc") {
            userTypeRoute = "Poc";
          }
          await axios.patch(`/${userTypeRoute}/${user.id}`, { confirmed: status });
          setOpen(false);
          if(callback) callback();
        } catch (error) {
          console.log("Error updating status", error);
        }
      }
    }
  };

  // const setMe = () => {
  //   try {
  //     let userTypeRoute;
  //     if (user.type === "distributor") {
  //       userTypeRoute = "Distributor";
  //     } else if (user.type === "bulkbreaker") {
  //       userTypeRoute = "BulkBreaker";
  //     } else if (user.type === "poc") {
  //       userTypeRoute = "Poc";
  //     }
  //     await axios.patch(`/${userTypeRoute}/${user.id}`, { confirmed: status });
  //     setOpen(false);
  //     if(callback) callback();
  //   } catch (error) {
  //     console.log("Error updating status", error);
  //   }
  // }

  return (
    <>
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 2000,
      }}
    >

      <Fade in={open}>
        { readUserGuide? <UserGuide setReadUserGuide={setReadUserGuide} setOpen={setOpen} callback={callback} user={user} myStatus={myStatus} /> : 
        <div className={classes.paper}>
          <div
            className={"text-light text-center"}
            style={{ fontSize: "15px", wordBreak: "nowrap" }}
          >
            { comingFrom==='logout'? 'Do you want customers to see your store open after logout?':'Welcome! Do you want customers to see your store open?' }
          </div>
          <div className={"row mt-4"}>
            <div className={"container offset-1 offset-md-2"}>
              <button
                className={"btn pr-4 pl-4 ml-md-1"}
                style={{
                  color: "white",
                  border: "1px solid green",
                  backgroundColor: colorYes,
                }}
                onClick={() => toggleStatus(true)}
              >
                Yes, I do!
              </button>
              <button
                className={"btn offset-1"}
                style={{
                  color: "white",
                  border: "1px solid white",
                  backgroundColor: colorNo,
                }}
                onClick={() => toggleStatus(false)}
              >
                No, I don't!
              </button>
            </div>
          </div>
        </div>}
      </Fade>

    </Modal>
    </>
  );
};

export default StatusModal;
