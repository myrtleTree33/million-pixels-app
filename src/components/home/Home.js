import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "react-tippy";
import { Stage, Layer, Rect, Text } from "react-konva";
import Konva from "konva";

import "react-tippy/dist/tippy.css";
import { unregisterPartial } from "handlebars";
import ky from "ky";

class CustomRect extends React.Component {
  handleOver = e => {
    const stage = e.target.getStage();
    const pointerPos = stage.getPointerPosition();
    const { x, y, weblink } = this.props;
    console.log(weblink, x, y, pointerPos);
  };

  handleOut = e => {};

  handleOnClick = e => {
    const { x, y, weblink } = this.props;
    if (!weblink) {
      console.log("NAVIGATE TO BUY");
      this.props.history.push("/buy");
      return;
    }

    // Navigate to site
    const loc = `${x}-${y}`;
    this.props.history.push(`/p?loc=${loc}`);
  };

  render() {
    const { color, weblink, x, y, xPos, yPos, width, height } = this.props;
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
      const weblink = mapEntry && mapEntry.weblink ? mapEntry.weblink : null;

      rects.push(
        <CustomRect
          weblink={weblink}
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

const fetchPage = async page => {
  // TODO load page and do comparison here
  console.log(page);

  const res = await ky
    .get(`http://localhost:8080/pixel/all?page=${page}`)
    .json();

  return res;

  // return page === 5 ? Promise.resolve([]) : Promise.resolve([1, 2, 3]);
};

class Home extends React.Component {
  state = {
    isComplete: false,
    weblink: null,
    currX: 0,
    currY: 0,
    coloredGridMap: {
      "0,5": { color: "#f00", weblink: "http://www.lego.com/" },
      "0,4": { color: "#f00", weblink: "http://www.lego.com/" },
      "0,3": { color: "#f00", weblink: "http://www.lego.com/" },
      "12,17": { color: "#f00", weblink: "http://www.lego.com/" },
      "32,37": { color: "#f00", weblink: "http://www.lego.com/" }
    }
  };

  updateGridProgressively = () => {
    const scheduleLoad = page => {
      (async () => {
        const results = await fetchPage(page);
        const { coloredGridMap } = this.state;

        // TODO mock terminating condition here
        if (!results || results.length === 0) {
          console.log("DONE");
          return;
        }

        const resultsMap = Object.assign(
          {},
          ...results.map(s => ({ [`${s.x},${s.y}`]: s }))
        );

        console.log("************8");
        console.log(this.state.coloredGridMap);
        console.log("************8");
        this.setState({
          coloredGridMap: Object.assign(coloredGridMap, resultsMap)
        });

        // Do progressive load
        setTimeout(() => {
          scheduleLoad(page + 1);
        }, 50);
      })();
    };

    scheduleLoad(0);
  };

  componentDidMount() {
    this.updateGridProgressively();
  }

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
        weblink: entry.weblink
      });
    } else if (this.state.weblink && !entry) {
      this.setState({
        weblink: null
      });
    }
  };

  render() {
    const { coloredGridMap, weblink, currX, currY } = this.state;
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
        title={weblink ? weblink : `Buy this pixel!`}
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
