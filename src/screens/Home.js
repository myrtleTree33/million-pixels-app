import React, { Component } from "react";
import PropTypes from "prop-types";

import Home from "../components/home/Home";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { history } = this.props;
    return <Home history={history} />;
  }
}

export default HomeScreen;
