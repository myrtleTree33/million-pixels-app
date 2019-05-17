import React, { Component } from "react";
import PropTypes from "prop-types";

import Buy from "../components/buy/Buy";

class BuyScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loc } = this.props.match.params;
    return <Buy loc={loc} />;
  }
}

export default BuyScreen;
