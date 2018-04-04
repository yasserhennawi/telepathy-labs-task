import React from "react";
import styled from "styled-components";
import TweetGrid from "../../components/TweetGrid";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const TweetGridSection = props => (
  <Wrapper>
    <TweetGrid {...props} />
  </Wrapper>
);

export default TweetGridSection;
