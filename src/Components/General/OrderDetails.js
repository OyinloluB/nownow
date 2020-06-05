import React from "react";
import { Component, useState } from "react";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import ReceiptIcon from "@material-ui/icons/Receipt";
import DoneIcon from "@material-ui/icons/Done";
import CachedIcon from "@material-ui/icons/Cached";
import NotInterestedIcon from "@material-ui/icons/NotInterested";

class OrderDetails extends Component {
  render() {
    return (
      <React.Fragment>
        {
          // isAuthenticated ? (
          <>
            <div className="mt-4" style={{ background: "#b11917" }}>
              <div
                className="container"
                style={{
                  border: "2px solid #b11917",
                  height: "80vh",
                  width: "80%",
                  background: "white",
                }}
              >
                <div
                  className="row p-1 pl-md-3 pr-md-3"
                  style={{ border: "1px solid grey" }}
                >
                  <Link
                    to="/orders"
                    style={{
                      textDecoration: "none",
                      color: "#b11917",
                      fontSize: "25px",
                    }}
                  >
                    <CancelPresentationIcon
                      onClick={this.backFunc}
                      style={{ border: "1px solid white", cursor: "pointer" }}
                    />
                  </Link>
                  <div className="p-2 text-justify offset-2 font-weight-bold">
                    Mustapha Habeeb
                  </div>
                  {/*  */}
                </div>
              </div>
            </div>
          </>
          // ) : ('history.push('/)')
        }
      </React.Fragment>
    );
  }
}

export default OrderDetails;
