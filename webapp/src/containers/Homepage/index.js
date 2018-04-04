import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  loginRequest,
  fetchTweetsRequest,
  postTweetRequest,
  authMeRequest
} from "../../redux-modules/app/actions";
import AddTweetSection from "../../containers/AddTweetSection";
import TweetGridSection from "../../containers/TweetGridSection";
import ProfileSection from "../../containers/ProfileSection";
import LoadingComponent from "../../components/LoadingComponent";
import Cookies from "universal-cookie";
import { withRouter } from "react-router-dom";

const cookies = new Cookies();

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lastTweetId: null };
  }

  componentWillMount() {
    if (cookies.get("access-token")) {
      this.props.authMeRequest();
    } else {
      this.props.history.push("/login");
    }
  }
  componentWillUpdate(nextProps) {
    const { userAuth } = this.props;
    if (userAuth && !nextProps.userAuth) {
    }
  }
  componentDidUpdate(prevProps) {
    const { homeTimeline } = this.props;

    const updateCondition =
      prevProps.homeTimeline !== homeTimeline && homeTimeline.length > 0;

    if (updateCondition) {
      const lastTweetId = homeTimeline[homeTimeline.length - 1].id;
      this.setState({ lastTweetId });
    }
  }

  submit = values => {
    const { tweetField: tweet } = values;
    this.props.postTweetRequest({ tweet });
  };

  onGetmoreClick = () => {
    this.props.fetchTweetsRequest({ maxId: this.state.lastTweetId });
  };

  onLogoutClick = () => {
    cookies.remove("access-token");
    this.props.history.push("/login");
  };

  render() {
    const { homeTimeline, profile, authUser, authResponded } = this.props;
    if (authResponded && !authUser) {
      this.props.history.push("/login");
    }
    if (authResponded && authUser) {
      return (
        <Wrapper>
          {profile && (
            <ProfileSection
              onLogoutClick={this.onLogoutClick}
              profile={profile}
            />
          )}
          <AddTweetSection submit={this.submit} label="Add a Tweet here:" />
          {homeTimeline && homeTimeline.length ? (
            <TweetGridSection
              tweets={homeTimeline}
              onGetmoreClick={this.onGetmoreClick}
            />
          ) : (
            <LoadingComponent to="TweetGridSection" />
          )}
        </Wrapper>
      );
    }
    return <LoadingComponent to="Homepage" />;
  }
}

Homepage.propTypes = {
  profile: PropTypes.object,
  loginRequest: PropTypes.func,
  homeTimeline: PropTypes.array,
  fetchTweetsRequest: PropTypes.func,
  authMeRequest: PropTypes.func
};

const mapStateToProps = state => {
  const { homeTimeline, profile, authResponded, authUser } = state.app;
  return {
    profile,
    homeTimeline,
    authUser,
    authResponded
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { postTweetRequest, loginRequest, fetchTweetsRequest, authMeRequest },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Homepage)
);
