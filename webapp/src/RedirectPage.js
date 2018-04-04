import React from "react";
import { bindActionCreators } from "redux";
import { redirectPage } from "./actions";
import { connect } from "react-redux";

class RedirectPage extends React.Component {
  componentWillMount() {
    this.props.redirectPage(this.props.routeParam);
  }

  render() {
    return <div>please wait...</div>;
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ redirectPage }, dispatch);
const mapStateToProps = state => ({
  routeParam: state.routerReducer.location.search
});

export default connect(mapStateToProps, mapDispatchToProps)(RedirectPage);
