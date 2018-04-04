import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import LoginSection from "../../containers/LoginSection";
import { loginRequest } from "../../redux-modules/app/actions";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 20px;
`;

class Loginpage extends React.Component {
  render() {
    return (
      <Wrapper>
        <LoginSection onLoginClick={this.props.loginRequest} />
      </Wrapper>
    );
  }
}

Loginpage.propTypes = {
  loginRequest: PropTypes.func
};
const mapStateToProps = state => ({
  authUser: state.app.authUser
})
const mapDispatchToProps = dispatch =>
  bindActionCreators({ loginRequest }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Loginpage);
