import React, { Component } from "react";
import ListHandler from "./ListHandler";
import AllOutIcon from "@material-ui/icons/AllOut";

class List extends Component {
  state = {};

  state = {
    modalSwitch: false,
    user_data: [],
  };

  styles = {
    btn: {
      position: "fixed",
      bottom: "20vh",
      left: "10%",
      color: "white",
      background: "#b11917",
      boxShadow: "5px 10px 8px 10px #888888",
      textJustify: "justify",
    },
  };

  handleList = ({ users }) => {
    var user_data = this.props.users;
    // console.log(user_data)
    this.setState({
      modalSwitch: true,
      user_data: user_data,
    });
  };

  render() {
    return (
      <React.Fragment>
        <ListHandler myState={this.state} closeModal={this.handleCloseModal} />
        <button
          className="btn"
          style={this.styles.btn}
          onClick={this.handleList}
        >
          <AllOutIcon /> Check Nearby Customers
        </button>
      </React.Fragment>
    );
  }
  handleCloseModal = () => {
    this.setState({
      modalSwitch: false,
    });
  };
}

export default List;
