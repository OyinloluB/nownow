import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import FilterListIcon from "@material-ui/icons/FilterList";
import GetAppIcon from "@material-ui/icons/GetApp";
import PublishIcon from "@material-ui/icons/Publish";
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

export default function Order() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const history = useHistory();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [orderType, setOrderType] = useState("Newly Received");
  const [switchReceived, setSwitchReceived] = useState("d-block");
  const [switchSent, setSwitchSent] = useState("d-none");
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  console.log(user);

  fetch("http://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => {
      this.setState({ contacts: data });
    })
    .catch(console.log);

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
    }
  };

  if (user.type === "distributor") {
    return (
      <React.Fragment>
        {isAuthenticated ? (
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
                {/* <ArrowBackSharpIcon style={{border: '1px solid #b11917', cursor: 'pointer'}} onClick={this.goBack} /> */}
                <div className="row p-1 pl-md-3 pr-md-3">
                  <button className="btn btn-info col-12">
                    <GetAppIcon /> Received Orders
                  </button>
                </div>

                <div
                  className="row mt-1 text-justify"
                  style={{ borderBottom: "1px solid grey" }}
                >
                  <div className="col-8 offset-2 font-weight-bold">
                    {orderType}
                  </div>

                  <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle
                      style={{
                        border: "1px solid #b11917",
                        borderRadius: "3px",
                        background: "white",
                      }}
                    >
                      <FilterListIcon style={{ color: "#b11017" }} />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem header className="font-weight-bold">
                        <FilterListIcon style={{ color: "#b11017" }} /> Filter
                        Received Orders by:
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
              </div>
            </div>
          </>
        ) : (
          history.push("/")
        )}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        {isAuthenticated ? (
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
                {/* <ArrowBackSharpIcon style={{border: '1px solid #b11917', cursor: 'pointer'}} onClick={this.goBack} /> */}
                <div className="row p-1 pl-md-3 pr-md-3">
                  <button
                    className="btn btn-info col-md-6"
                    onClick={() => switchOrder("received")}
                  >
                    <GetAppIcon /> Received Orders
                  </button>
                  <button
                    className="btn btn-warning col-md-6"
                    onClick={() => switchOrder("sent")}
                  >
                    <PublishIcon /> Sent Orders
                  </button>
                </div>

                {/* Received Order Template */}
                <div
                  className="row mt-1 text-justify"
                  style={{ borderBottom: "1px solid grey" }}
                >
                  <div className="col-8 offset-2 font-weight-bold">
                    {orderType}
                  </div>

                  <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle
                      style={{
                        border: "1px solid #b11917",
                        borderRadius: "3px",
                        background: "white",
                      }}
                    >
                      <FilterListIcon style={{ color: "#b11017" }} />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem header className="font-weight-bold">
                        <FilterListIcon style={{ color: "#b11017" }} /> Filter
                        Received Orders by:
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

                {/* Sent Order Template */}
              </div>
            </div>
          </>
        ) : (
          history.push("/")
        )}
      </React.Fragment>
    );
  }
}
