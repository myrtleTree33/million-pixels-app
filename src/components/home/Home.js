import React from "react";
import PropTypes from "prop-types";

import { Stage, Layer, Rect, Text } from "react-konva";
import Konva from "konva";

class ColoredRect extends React.Component {
  state = {
    color: "green"
  };
  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  };
  render() {
    return (
      <Rect
        x={20}
        y={20}
        width={50}
        height={50}
        fill={this.state.color}
        shadowBlur={5}
        onClick={this.handleClick}
      />
    );
  }
}

const Home = ({ props }) => {
  return (
    <div
      style={{
        background: "#ccc"
      }}
    >
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text text="Try click on rect" />
          <ColoredRect />
        </Layer>
      </Stage>
    </div>
  );
};

export default Home;
