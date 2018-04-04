import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "../../components/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Title = styled.h3`
  margin: 0 0 20px;
`;
const LoginSection = ({ title, onLoginClick }) => (
  <Wrapper>
    <Title>{title}</Title>
    <Button onClick={onLoginClick}>Login</Button>
  </Wrapper>
);

LoginSection.defaultProps = {
  title: "Click here to Login with Twitter"
};

LoginSection.propTypes = {
  title: PropTypes.string,
  onLoginClick: PropTypes.func.isRequired
};
export default LoginSection;
