import React from "react";
import PropTypes from "prop-types";

const LoadingComponent = ({ to }) => <div>Loading component to {to}</div>;

LoadingComponent.displayName = "LoadingComponent";

LoadingComponent.defaultProps = {
  size: 70
};

LoadingComponent.propTypes = {
  to: PropTypes.string
};

export default LoadingComponent;
