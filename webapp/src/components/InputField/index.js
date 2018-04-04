import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Field } from "redux-form";

const StyledField = styled(Field)`
  outline: none;
  padding: 5px;
  /* -webkit-appearance: none; */
`;

const InputField = ({ name, placeholder }) => (
  <StyledField
    name={name}
    component="input"
    type="text"
    placeholder={placeholder}
  />
);

InputField.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string
};

export default InputField;
