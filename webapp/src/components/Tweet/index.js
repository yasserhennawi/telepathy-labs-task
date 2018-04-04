import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TweetWrapper = styled.div`
  display: flex;
  padding: 10px;
  border: 2px solid #444;
`;

const Tweet = ({ tweet, key }) => (
  <TweetWrapper key={key}>{tweet.text}</TweetWrapper>
);

Tweet.displayName = "Tweet";

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired,
  key: PropTypes.string.isRequired
};

export default Tweet;
