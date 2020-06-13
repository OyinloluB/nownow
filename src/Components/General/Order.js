import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";

import CancelIcon from "@material-ui/icons/Cancel";
import FilterListIcon from "@material-ui/icons/FilterList";
import GetAppIcon from "@material-ui/icons/GetApp";
import PublishIcon from "@material-ui/icons/Publish";
import Container from "@material-ui/core/Container";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import ReceiptIcon from "@material-ui/icons/Receipt";
import DoneIcon from "@material-ui/icons/Done";
import CachedIcon from "@material-ui/icons/Cached";
import NotInterestedIcon from "@material-ui/icons/NotInterested";

import { SelectDropdown } from "../Layout/SelectDropdown";
import Spinner from "../Loaders/Spinner";

import ReceivdOrders from "./ReceivedOrders";
import SentOrders from "./SentOrders";

import {
  updateOrderStatus,
} from "../../redux/order/order.actions";

const Order = () => {
  const { user, receivedOrders, sentOrders, loading } = useSelector((state) => {
    return {
      user: state.auth.user,
      loading: state.order.loading,
      receivedOrders: state.order.receivedOrders,
      sentOrders: state.order.sentOrders,
    };
  });
  const dispatch = useDispatch();

  const [currentOrder, setCurrentOrder] = useState({ items: [] });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState({
    type: "Newly Received",
    status: "new",
  });
  const [switchReceived, setSwitchReceived] = useState("d-block");
  const [switchSent, setSwitchSent] = useState("d-none");

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleStatusUpdate = (status) => {
    dispatch(updateOrderStatus(currentOrder._id, status))
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  // handling button switch order
  const switchOrder = (x) => {
    switch (x) {
      case "received":
        setSwitchReceived("d-block");
        setSwitchSent("d-none");
        setOrderStatus({ type: "Newly Received", status: "new" });
        break;

      case "sent":
        setSwitchReceived("d-none");
        setSwitchSent("d-block");
        setOrderStatus({ type: "Newly Sent", status: "new" });
        break;
      default:
        return;
    }
  };

  return (
    <>
      <Container
        className="container"
        maxWidth="sm"
        style={{
          overflow: "auto",
          margin: "5vh auto 0vh auto",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <h6
            className={`col-md-${
              user.type !== "distributor" ? "6" : "12"
            }`}
            style={{
              textAlign: "center",
              backgroundColor: "#f7f7f7",
              padding: "10px",
              cursor: "pointer",
              backgroundColor: "green",
              color: '#fff'
            }}
            onClick={() => {
              setCurrentOrder({ items: [] });
              switchOrder("received");
            }}
          >
            <GetAppIcon /> Received Orders
          </h6>

          {user.type !== "distributor" ? (
            <h6
              className="col-md-6"
              onClick={() => {
                setCurrentOrder({ items: [] });
                switchOrder("sent");
              }}
              style={{
                textAlign: "center",
                backgroundColor: "rgb(215, 215, 215)",
                cursor: "pointer",
                padding: "10px",
                backgroundColor: '#B11917',
                color: '#fff'
              }}
            >
              <PublishIcon /> Orders I Placed
            </h6>
          ) : null}
        </div>
        <br />
        {switchSent === "d-none" && currentOrder.items.length > 0 ? (
          <Row>
            <Col
              xs={12}
              md={12}
              lg={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "30px",
              }}
            >
              <CancelIcon
                style={{ color: "#b11917", cursor: "pointer" }}
                onClick={() => setCurrentOrder({ items: [] })}
              />
              <p
                style={{
                  marginBottom: "0px",
                }}
              >
                {currentOrder.user.name}
              </p>
            </Col>
            <Col xs={12} md={12} lg={12}>
              <SelectDropdown />
            </Col>
          </Row>
        ) : null}

        {currentOrder.items.length > 0 ? null : (
          <div
            className="row text-justify"
            style={{
              marginTop: ".8rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <div className="col-8  font-weight-bold">{orderStatus.type}</div>

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
                  <FilterListIcon style={{ color: "#b11017" }} /> Filter{" "}
                  {`${switchSent === "d-none" ? "Received" : "Sent"}`}
                  Orders by:
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  onClick={() =>
                    setOrderStatus({
                      type: `Newly ${
                        switchSent === "d-none" ? "Received" : "Sent"
                      }`,
                      status: "new",
                    })
                  }
                >
                  <ReceiptIcon className="mr-3" />
                  {`Newly ${switchSent === "d-none" ? "Received" : "Sent"}`}
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  onClick={() =>
                    setOrderStatus({ type: "Delivered", status: "delivered" })
                  }
                >
                  <DoneIcon className="mr-3" />
                  Delivered
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  onClick={() =>
                    setOrderStatus({ type: "Processing", status: "processing" })
                  }
                >
                  <CachedIcon className="mr-3" />
                  Processing
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  onClick={() =>
                    setOrderStatus({ type: "Declined", status: "declined" })
                  }
                >
                  <NotInterestedIcon className="mr-3" />
                  Declined
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  onClick={() =>
                    setOrderStatus({ type: "All Received", status: "all" })
                  }
                >
                  <FilterListIcon className="mr-3" />
                  {`All ${switchSent === "d-none" ? "Received" : "Sent"}`}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )}
        <hr
          style={{
            border: "1px solid rgb(223, 223, 223)",
          }}
        />
        {loading ? (
          <Spinner />
        ) : (
          <>
            <ReceivdOrders
              switchReceived={switchReceived}
              receivedOrders={receivedOrders}
              currentOrder={currentOrder}
              setCurrentOrder={setCurrentOrder}
              orderStatus={orderStatus}
              handleStatusUpdate={handleStatusUpdate}
            />
            <SentOrders
              switchSent={switchSent}
              sentOrders={sentOrders}
              currentOrder={currentOrder}
              setCurrentOrder={setCurrentOrder}
              orderStatus={orderStatus}
              handleStatusUpdate={handleStatusUpdate}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default React.memo(Order);
