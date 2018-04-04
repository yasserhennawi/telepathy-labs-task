import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import InputField from "../../components/InputField";
import ReduxForm from "../ReduxForm";
import Button from "../../components/Button";

const StyledReduxForm = styled(ReduxForm)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  & > * {
    margin-right: 20px;
  }
  &:last-child {
    margin-right: 0;
  }
`;

const SideLable = styled.div``;

const AddTweetSection = ({ submit, label }) => (
  <StyledReduxForm onSubmit={submit}>
    <SideLable>{label}</SideLable>
    <InputField name="tweetField" />
    <Button type="submit">Submit</Button>
  </StyledReduxForm>
);

AddTweetSection.propTypes = {
  submit: PropTypes.func.isRequired
};

export default AddTweetSection;
