import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "react-tippy";
import { Stage, Layer, Rect, Text } from "react-konva";
import Konva from "konva";

import "react-tippy/dist/tippy.css";

class CustomRect extends React.Component {
  constructor(props) {
    super(props);
  }

  handleOver = e => {
    const stage = e.target.getStage();
    const pointerPos = stage.getPointerPosition();
    const { x, y, onOver } = this.props;
    console.log(x, y, pointerPos);
    onOver(x, y);
  };

  handleOut = e => {
    const { x, y, onOut } = this.props;
    console.log(x, y);
    onOut(x, y);
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
        onMouseLeave={this.handleOut}
      />
    );
  }
}

const makeGrid = ({
  width = 50,
  height = 50,
  numX = 0,
  numY = 0,
  onOver,
  onOut
}) => {
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
          onOver={onOver}
          onOut={onOut}
        />
      );
    }
  }
  return rects;
};

class Home extends React.Component {
  state = {
    showRect: false,
    currX: 0,
    currY: 0
  };

  onOver = (x, y) => {
    console.log("over");
    this.setState({
      showRect: true,
      currX: x,
      currY: y
    });
  };

  onOut = (x, y) => {
    console.log("out");
    this.setState({
      showRect: false
    });
  };

  rects = makeGrid({
    width: 933,
    height: window.innerHeight,
    numX: 100,
    numY: 100,
    onOver: this.onOver,
    onOut: this.onOut
  });

  render() {
    const { currX, currY, showRect } = this.state;

    return (
      <Tooltip
        // options
        title={`Buy (${currX},${currY})`}
        position="bottom"
        trigger="mouseenter"
        followCursor={true}
        stickyDuration={0}
      >
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
              {this.rects.map(r => r)}
            </Layer>
          </Stage>
        </div>
      </Tooltip>
    );
  }
}

export default Home;
