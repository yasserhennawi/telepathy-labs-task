// import React from "react";
import styled from "styled-components";
import normalize from "./normalize";

const Button = styled.button`
  ${normalize};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  border: 1px solid ${props => props.primaryColor};
  color: ${props => props.primaryColor};
  background-color: ${props => props.secondaryColor};
  &:hover {
    transform: translateY(-2px);
    margin-top: -2px;
    border-bottom-width: 3px;
  }
  transition: ease-in-out 0.05s;
  &:active {
    background-color: ${props => props.primaryColor};
    color: ${props => props.secondaryColor};
  }
`;

Button.displayName = "Button";

Button.defaultProps = {
  secondaryColor: "#FFF",
  primaryColor: "#212121"
};

export default Button;
