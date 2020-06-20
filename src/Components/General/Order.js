import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";

import Container from "@material-ui/core/Container";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import {
  Cancel as CancelIcon,
  FilterList as FilterListIcon,
  GetApp as GetAppIcon,
  Publish as PublishIcon,
  Receipt as ReceiptIcon,
  Done as DoneIcon,
  Cached as CachedIcon,
  NotInterested as NotInterestedIcon,
} from "@material-ui/icons";

import OrderDropdown from "../Layout/OrderDropdown";
import Spinner from "../Loaders/Spinner";

import ReceivdOrders from "./ReceivedOrders";
import SentOrders from "./SentOrders";

import {
  updateOrderStatus,
  fetchSentOrders,
  fetchReceivedOrders,
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
  const [ opa1, setOpa1 ] = useState("");
  const [ opa2, setOpa2 ] = useState("grey");
  const [switchSent, setSwitchSent] = useState("d-none");

  useEffect(() => {
    dispatch(fetchReceivedOrders());
    if (user.type !== "distributor") {
      dispatch(fetchSentOrders());
    }
  }, [dispatch, user.type]);

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
        setOpa2("grey")
        setOpa1("")
        break;

      case "sent":
        setSwitchReceived("d-none");
        setSwitchSent("d-block");
        setOrderStatus({ type: "Newly Sent", status: "new" });
        setOpa2("");
        setOpa1("grey");
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
          margin: "10vh auto 0vh auto",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <button
            className={`col-md-${user.type !== "distributor" ? "6" : "12"}`}
            style={{
              textAlign: "center",
              padding: "12px 4px 12px 4px",
              cursor: "pointer",
              backgroundColor: opa1,
              color: '#45130F',
              border: '1px solid grey',
              width: '50%',
              fontSize: '15px',
              fontWeight: 'bold'
            }}
            onClick={() => {
              setCurrentOrder({ items: [] });
              switchOrder("received");
            }}
          >
            <GetAppIcon style={{fontSize: '13px'}} /> Received Orders
          </button>

          {user.type !== "distributor" ? (
            <button
              className="col-md-6"
              onClick={() => {
                setCurrentOrder({ items: [] });
                switchOrder("sent");
              }}
              style={{
                textAlign: "center",
                cursor: "pointer",
                padding: "12px 4px 12px 4px",
                fontSize: '13px',
                backgroundColor: opa2,
                color: '#45130F',
                border: '1px solid grey',
                fontWeight: 'bold',
                width: '50%'
              }}
            >
              <PublishIcon style={{fontSize: '16px'}} /> Orders I Placed
            </button>
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
              <OrderDropdown
                isProcessing={currentOrder.status === "processing"}
                isInTransit={currentOrder.status === "transit"}
                updateOrderStatus={handleStatusUpdate}
              />
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
            <div className="col-8  font-weight-bold">{orderStatus.type === 'Newly Sent' || orderStatus.type==='Newly Received'? 'Awaiting Confirmation':orderStatus.type}</div>

            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle
                style={{
                  background: "white",
                }}
                >
                <span style={{color: 'green'}}>Filter by</span>
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
                      type: `Newly ${switchSent === "d-none" ? "Received" : "Sent"}`,
                      status: "new",
                    })
                  }
                >
                  <ReceiptIcon className="mr-3" />
                  {"Awaiting Confirmation"}
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  onClick={() =>
                    setOrderStatus({ type: "Delivered", status: "confirmed" })
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
