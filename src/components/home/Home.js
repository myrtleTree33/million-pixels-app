import React from "react";
import PropTypes from "prop-types";

import { Stage, Layer, Rect, Text } from "react-konva";
import Konva from "konva";

class CustomRect extends React.Component {
  constructor(props) {
    super(props);

    this.handleOver = this.handleOver.bind(this);
  }

  handleOver = () => {
    const { x, y } = this.props;
    console.log(x, y);
  };

  // handleClick = () => {
  //   this.setState({
  //     color: Konva.Util.getRandomColor()
  //   });
  // };
  render() {
    const { x, y, xPos, yPos, width, height } = this.props;
    return (
      <Rect
        x={xPos}
        y={yPos}
        width={width}
        height={height}
        stroke="#fff"
        strokeWidth={1}
        onMouseEnter={this.handleOver}
      />
    );
  }
}

const makeGrid = ({ width = 50, height = 50, numX = 0, numY = 0 }) => {
  const rects = [];
  const rectWidth = width / numX;
  const rectHeight = height / numY;
  for (let y = 0; y < numY; y++) {
    for (let x = 0; x < numX; x++) {
      rects.push(
        <CustomRect
          x={x}
          y={y}
          xPos={x * rectWidth}
          yPos={y * rectHeight}
          width={rectWidth}
          height={rectHeight}
        />
      );
    }
  }
  return rects;
};

const Home = ({ props }) => {
  const rects = makeGrid({
    width: 933,
    height: window.innerHeight,
    numX: 100,
    numY: 100
  });

  return (
    <div
      style={{
        width: 933,
        maxWidth: 933,
        background: "#eee"
      }}
    >
      <Stage width={933} height={window.innerHeight}>
        <Layer>
          {/* <Text text="Try click on rect" /> */}
          {/* <ColoredRect /> */}
          {rects.map(r => r)}
        </Layer>
      </Stage>
    </div>
  );
};

export default Home;
