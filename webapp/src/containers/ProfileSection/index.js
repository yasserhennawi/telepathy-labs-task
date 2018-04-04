import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CircleImage from "../../components/CircleImage";
import Button from "../../components/Button";

const DisplayName = styled.h3`
  margin: 0;
`;
const Username = styled.h4`
  margin: 0;
  color: #888;
`;
const Title = styled.h2`
  margin: 0;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  & > * {
    margin-bottom: 10px;
  }
`;

const ProfileSection = ({ profile, size, onLogoutClick }) => {
  const { profileImage, displayName, username } = profile;
  return (
    <Wrapper>
      <Button onClick={onLogoutClick}>Logout</Button>
      <CircleImage image={profileImage} size={size} />
      <Title>Welcome</Title>
      <DisplayName>{displayName}</DisplayName>
      <Username>@{username}</Username>
    </Wrapper>
  );
};

ProfileSection.propTypes = {
  size: PropTypes.number,
  profile: PropTypes.object.isRequired,
  onLogoutClick: PropTypes.func.isRequired
};

export default ProfileSection;
