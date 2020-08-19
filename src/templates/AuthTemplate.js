import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Heading from 'components/atoms/Heading/Heading';
import logoImg from 'assets/icons/logo.svg';

const AuthTemplateWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.notes};
  margin: 0;
  padding: 0 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLogo = styled.img`
  width: 150px;
  height: auto;
`;

const StyledHeading = styled(Heading)`
  font-size: ${({ theme }) => theme.fontSize.m};
  text-align: center;
  margin: 25px 0;
`;

const AuthTemplate = ({ children }) => {
  React.useEffect(() => {
    window.localStorage.setItem('userID', '');
  }, '');

  return (
    <AuthTemplateWrapper>
      <StyledLogo src={logoImg} />
      <StyledHeading>Your new favorite online notes experience</StyledHeading>
      {children}
    </AuthTemplateWrapper>
  );
};

AuthTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
};

export default AuthTemplate;
