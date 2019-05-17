import React from "react";
import PropTypes from "prop-types";
import { Message, Button, Checkbox, Form, Input } from "semantic-ui-react";
import { HuePicker } from "react-color";

import "react-tippy/dist/tippy.css";

class Buy extends React.Component {
  state = {
    pos: null,
    color: null,
    hyperlink: null,
    tosAgreed: false,
    customColor: "#fff",
    displayWarning: false
  };

  componentDidMount = () => {
    const { loc } = this.props;
    this.setState({ pos: loc.replace("-", ",") });
  };

  handleColorChange = (e, { value }) => {
    console.log(value);
    this.setState({ color: value });
  };

  handleCustomColorChange = (color, event) => {
    if (!color) {
      return;
    }
    const { hex } = color;
    if (hex) {
      this.setState({ customColor: hex });
    }
  };

  handlePixelChange = (e, { value }) => {
    this.setState({ pos: value });
  };

  handleHyperlinkChange = (e, { value }) => {
    this.setState({ hyperlink: value });
  };

  handleTosChange = (e, { value }) => {
    this.setState({ tosAgreed: !this.state.tosAgreed });
  };

  handleSubmit = (e, props) => {
    console.log(this.state);
    const { pos, color, hyperlink, tosAgreed, customColor } = this.state;
    if (!pos || !color || !hyperlink || !tosAgreed) {
      this.setState({ displayWarning: true });
      return;
    }
  };

  render() {
    const { color, customColor, displayWarning, pos } = this.state;

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            maxWidth: "700px"
          }}
        >
          {displayWarning ? (
            <Message warning>
              <Message.Header>Form is incomplete!</Message.Header>
              <p>Please fill in the missing fields.</p>
            </Message>
          ) : (
            <div />
          )}

          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              placeholder="12,5"
              label="Pixel position"
              name="position"
              value={pos}
              onChange={this.handlePixelChange}
            />

            <Form.Input
              placeholder="http://www.lego.com"
              label="Website"
              name="hyperlink"
              onChange={this.handleHyperlinkChange}
            />

            <Form.Checkbox
              label="I agree to the Terms and Conditions"
              onChange={this.handleTosChange}
            />

            <Form.Group inline>
              <label>Color</label>
              <Form.Radio
                label="Red"
                value="red"
                checked={color === "red"}
                onChange={this.handleColorChange}
              />
              <Form.Radio
                label="Green"
                value="green"
                checked={color === "green"}
                onChange={this.handleColorChange}
              />
              <Form.Radio
                label="Yellow"
                value="yellow"
                checked={color === "yellow"}
                onChange={this.handleColorChange}
              />
              <Form.Radio
                label="Blue"
                value="blue"
                checked={color === "blue"}
                onChange={this.handleColorChange}
              />

              <Form.Radio
                label="Custom"
                value="custom"
                checked={color === "custom"}
                onChange={this.handleColorChange}
              />
            </Form.Group>

            <Form.Field>
              <HuePicker
                disableAlpha={true}
                color={customColor}
                onChange={this.handleCustomColorChange}
              />
            </Form.Field>

            <Button type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Buy;
