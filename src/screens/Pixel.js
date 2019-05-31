import React, { Component } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import ky from "ky";

import Pixel from "../components/pixel/Pixel";

class PixelScreen extends Component {
  state = {
    pixel: null
  };

  async componentDidMount() {
    const { loc } = queryString.parse(this.props.location.search);
    if (!loc) {
      return;
    }

    const [x, y] = loc.split("-");

    try {
      const pixel = await ky
        .post("http://localhost:8080/pixel", {
          json: {
            x,
            y
          }
        })
        .json();

      console.log("*****");
      console.log(pixel);
      console.log("*****");

      this.setState({ pixel });
    } catch (e) {}
  }

  render() {
    const { pixel } = this.state;
    return <Pixel pixel={pixel} />;
  }
}

export default PixelScreen;
