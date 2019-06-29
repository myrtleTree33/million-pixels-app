import React from "react";
import PropTypes from "prop-types";

const Pixel = ({ pixel }) => {
  const { x, y, weblink, color } = pixel;
  return (
    <div>
      <div>${color}</div>
      <div>${weblink}</div>
      <div>
        ${x} - ${y}
      </div>
    </div>
  );
};

export default Pixel;
