import React, { Component } from "react";
import PropTypes from "prop-types";

import queryString from "query-string";
import ky from "ky";
import { Elements, StripeProvider } from "react-stripe-elements";

import Buy from "../components/buy/Buy";

const { REACT_APP_STRIPE_PUBLIC_KEY } = process.env;

class BuyScreen extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = data => {
    (async () => {
      console.log(data);
      const { x, y, hyperlink, color, customColor, tokenId } = data;

      try {
        const res = await ky
          .post("http://localhost:8080/pixel/purchase", {
            json: {
              x,
              y,
              weblink: hyperlink,
              color,
              customColor,
              tokenId
            }
          })
          .json();

        // If pixel already available,
        // Do not load to next page
      } catch (e) {
        console.error("Issue saving.");
        alert("Pixel has been taken!");
        return;
      }

      // Redirect to main page
      this.props.history.push("/");
    })();
  };

  render() {
    const { loc } = queryString.parse(this.props.location.search);

    return (
      <StripeProvider apiKey={REACT_APP_STRIPE_PUBLIC_KEY}>
        <Elements>
          <Buy loc={loc} onSubmit={this.handleSubmit} />
        </Elements>
      </StripeProvider>
    );
  }
}

export default BuyScreen;
