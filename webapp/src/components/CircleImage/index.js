// import React from "react";
import styled from "styled-components";

const CircleImage = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border: 1px solid #212121;
  background-image: url(${props => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 100%;
`;

CircleImage.displayName = "CircleImage";

CircleImage.defaultProps = {
  size: 70
};

export default CircleImage;
