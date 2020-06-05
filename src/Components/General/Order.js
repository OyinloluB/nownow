import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import FilterListIcon from "@material-ui/icons/FilterList";
import GetAppIcon from "@material-ui/icons/GetApp";
import PublishIcon from "@material-ui/icons/Publish";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import ReceiptIcon from "@material-ui/icons/Receipt";
import DoneIcon from "@material-ui/icons/Done";
import CachedIcon from "@material-ui/icons/Cached";
import NotInterestedIcon from "@material-ui/icons/NotInterested";

import OrderItem from '../Layout/OrderItem';

import {
  fetchReceivedOrders,
  fetchSentOrders,
} from "../../redux/order/order.actions";

export default function Order() {
  const { user, receivedOrders, sentOrders } = useSelector((state) => {
    return {
      user: state.auth.user,
      receivedOrders: state.order.receivedOrders,
      sentOrders: state.order.sentOrders,
    };
  });
  const dispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [orderType, setOrderType] = useState("Newly Received");
  const [switchReceived, setSwitchReceived] = useState("d-block");
  const [switchSent, setSwitchSent] = useState("d-none");
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    if (user.type === "distributor") {
      dispatch(fetchReceivedOrders());
    } else {
      dispatch(fetchReceivedOrders());
      dispatch(fetchSentOrders());
    }
  }, [user, dispatch]);

  // dropdwn methods
  const handleFilter = (x) => {
    switch (x) {
      case "new_received":
        setOrderType("Newly Received");
        break;
      case "all_received":
        setOrderType("All Received");
        break;
      case "delivered":
        setOrderType("Delivered");
        break;
      case "processing":
        setOrderType("Processing");
        break;
      case "declined":
        setOrderType("Declined");
        break;
      default:
        return;
    }
  };

  // handling button switch order
  const switchOrder = (x) => {
    switch (x) {
      case "received":
        setSwitchReceived("d-block");
        setSwitchSent("d-none");
        setOrderType("Newly Received");
        break;

      case "sent":
        setSwitchReceived("d-none");
        setSwitchSent("d-block");
        setSwitchSent("d-block");
        setOrderType("Delivered");
        break;
      default:
        return;
    }
  };

  return (
    <>
      <div
        className="container"
        style={{
          marginTop: "20px",
          border: "2px solid #b11917",
          height: "90vh",
          width: "85%",
          background: "white",
          borderRadius: "4px",
          padding: ".9rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <button
            className={`btn btn-info col-md-${
              user.type !== "distributor" ? "6" : "12"
            }`}
            onClick={() => switchOrder("received")}
          >
            <GetAppIcon /> Received Orders
          </button>
          {user.type !== "distributor" ? (
            <button
              className="btn btn-warning col-md-6"
              onClick={() => switchOrder("sent")}
            >
              <PublishIcon /> Sent Orders
            </button>
          ) : null}
        </div>
        <div
          className="row text-justify"
          style={{
            marginTop: ".8rem",
          }}
        >
          <div className="col-8 offset-2 font-weight-bold">{orderType}</div>

          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle
              style={{
                background: "white",
              }}
            >
              <FilterListIcon style={{ color: "#b11017" }} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header className="font-weight-bold">
                <FilterListIcon style={{ color: "#b11017" }} /> Filter Received
                Orders by:
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem
                onClick={() => handleFilter("new_received")}
                className={(switchSent, switchReceived)}
              >
                <ReceiptIcon className="mr-3" />
                Newly Received
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => handleFilter("delivered")}>
                <DoneIcon className="mr-3" />
                Delivered
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => handleFilter("processing")}>
                <CachedIcon className="mr-3" />
                Processing
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => handleFilter("declined")}>
                <NotInterestedIcon className="mr-3" />
                Declined
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem
                onClick={() => handleFilter("all_received")}
                className={(switchSent, switchReceived)}
              >
                <FilterListIcon className="mr-3" />
                All Received
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <hr
          style={{
            border: "1px solid #b11917",
          }}
        />
        <OrderItem />
      </div>
    </>
  );
}
