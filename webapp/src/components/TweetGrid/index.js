import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Tweet from "../Tweet";
import Button from "../../components/Button";

const TweetGridContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  & > * {
    margin-bottom: 10px;
  }
`;
const TweetGrid = ({ tweets, onGetmoreClick }) => {
  const lastTweetId = tweets && tweets[tweets.length - 1].id;
  return (
    <TweetGridContainer>
      {tweets.map(tweet => <Tweet key={tweet.id} tweet={tweet} />)}
      <Button onClick={() => onGetmoreClick(lastTweetId)}>
        Get more tweets
      </Button>
    </TweetGridContainer>
  );
};

TweetGrid.displayName = "TweetGrid";

TweetGrid.propTypes = {
  tweets: PropTypes.array.isRequired,
  onGetmoreClick: PropTypes.func.isRequired
};

export default TweetGrid;
