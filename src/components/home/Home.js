import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "react-tippy";
import { Stage, Layer, Rect, Text } from "react-konva";
import Konva from "konva";

import "react-tippy/dist/tippy.css";

class CustomRect extends React.Component {
  handleOver = e => {
    const stage = e.target.getStage();
    const pointerPos = stage.getPointerPosition();
    const { x, y, url } = this.props;
    console.log(url, x, y, pointerPos);
  };

  handleOut = e => {};

  handleOnClick = e => {
    const { x, y, url } = this.props;
    if (!url) {
      console.log("NAVIGATE TO BUY");
      this.props.history.push("/buy");
      return;
    }
    console.log("NAVIGATE TO SITE");
  };

  render() {
    const { color, url, x, y, xPos, yPos, width, height } = this.props;
    return (
      <Rect
        fill={color}
        x={xPos}
        y={yPos}
        width={width}
        height={height}
        stroke="#fff"
        strokeWidth={1}
        onMouseEnter={this.handleOver}
        onMouseLeave={this.handleOut}
        onClick={this.handleOnClick}
      />
    );
  }
}

const makeKey = ({ x, y }) => `${x},${y}`;

const makeGrid = ({
  coloredGridMap = [],
  width = 50,
  height = 50,
  numX = 0,
  numY = 0,
  history
}) => {
  const rects = [];
  const rectWidth = width / numX;
  const rectHeight = height / numY;
  for (let y = 0; y < numY; y++) {
    for (let x = 0; x < numX; x++) {
      const key = makeKey({ x, y });
      const mapEntry = coloredGridMap[key];
      const color = mapEntry && mapEntry.color ? mapEntry.color : null;
      const url = mapEntry && mapEntry.url ? mapEntry.url : null;

      rects.push(
        <CustomRect
          url={url}
          color={color}
          x={x}
          y={y}
          xPos={x * rectWidth}
          yPos={y * rectHeight}
          width={rectWidth}
          height={rectHeight}
          history={history}
        />
      );
    }
  }
  return rects;
};

class Home extends React.Component {
  state = {
    url: null,
    currX: 0,
    currY: 0,
    coloredGridMap: {
      "0,5": { color: "#f00", url: "http://www.lego.com/" },
      "0,4": { color: "#f00", url: "http://www.lego.com/" },
      "0,3": { color: "#f00", url: "http://www.lego.com/" },
      "12,17": { color: "#f00", url: "http://www.lego.com/" },
      "32,37": { color: "#f00", url: "http://www.lego.com/" }
    }
  };

  handleMouseMove = e => {
    const { coloredGridMap } = this.state;
    const stage = e.target.getStage();
    const pointerPos = stage.getPointerPosition();

    const rectWidth = 933 / 70;
    const rectHeight = window.innerHeight / 70;

    const coords = {
      x: Math.floor(pointerPos.x / rectWidth),
      y: Math.floor(pointerPos.y / rectHeight)
    };

    const key = makeKey(coords);
    const entry = coloredGridMap[key];
    if (entry) {
      this.setState({
        url: entry.url
      });
    } else if (this.state.url && !entry) {
      this.setState({
        url: null
      });
    }
  };

  render() {
    const { coloredGridMap, url, currX, currY } = this.state;
    const { history } = this.props;

    const rects = makeGrid({
      coloredGridMap,
      width: 933,
      height: window.innerHeight,
      numX: 70,
      numY: 70,
      history
    });

    return (
      <Tooltip
        // options
        title={url ? url : `Buy this pixel!`}
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
          <Stage
            width={933}
            height={window.innerHeight}
            onMouseMove={this.handleMouseMove}
          >
            <Layer>
              {/* <Text text="Try click on rect" /> */}
              {/* <ColoredRect /> */}
              {rects.map(r => r)}
            </Layer>
          </Stage>
        </div>
      </Tooltip>
    );
  }
}

export default Home;
