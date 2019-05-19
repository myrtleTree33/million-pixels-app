import React, { Component } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";

import Buy from "../components/buy/Buy";

class BuyScreen extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = data => {
    console.log(data);
    // TODO post to backend
    this.props.history.push("/");
  };

  render() {
    const { loc } = queryString.parse(this.props.location.search);
    return <Buy loc={loc} onSubmit={this.handleSubmit} />;
  }
}

export default BuyScreen;
