import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withContext from 'hoc/withContext';
import logoIcon from 'assets/icons/logo.svg';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import bulbIcon from 'assets/icons/bulb.svg';
import logoutIcon from 'assets/icons/logout.svg';
import penIcon from 'assets/icons/pen.svg';
import twitterIcon from 'assets/icons/twitter.svg';
import { logout as logoutAction } from 'actions';

const MainWrapper = styled.nav`
  height: 67px;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 9999;
  background: ${({ theme, pagecolor }) => theme[pagecolor]};

  @media (min-width: 800px) {
    width: 150px;
    height: 100vh;
    flex-flow: column;
    padding: 20px 0;
  }
`;

const StyledLogo = styled.div`
  display: block;
  width: 67px;
  height: 67px;
  background-image: url(${logoIcon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 80%;
  @media screen and (min-width: 800px) {
    width: 100px;
    height: 100px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  @media screen and (min-width: 800px) {
    flex-flow: column;
    padding-bottom: 40vh;
  }
`;

const StyledButtonIcon = styled(ButtonIcon)`
  width: 50px;
  height: 50px;
  margin: 0 5px;
  background-color: ${({ theme, pagecolor }) => theme[pagecolor]};

  @media screen and (min-width: 800px) {
    width: 60px;
    height: 60px;
    margin: 5px 0;
  }
`;

const Sidebar = ({ pageContext, logout }) => (
  <MainWrapper pagecolor={pageContext}>
    <StyledLogo />
    <IconWrapper>
      <StyledButtonIcon
        as={NavLink}
        to="/notes"
        icon={penIcon}
        activeclass="active"
        pagecontext={pageContext}
      />
      <StyledButtonIcon as={NavLink} to="/twitters" icon={twitterIcon} pagecolor={pageContext} />
      <StyledButtonIcon as={NavLink} to="/articles" icon={bulbIcon} pagecolor={pageContext} />
    </IconWrapper>
    <StyledButtonIcon
      onClick={logout}
      as={NavLink}
      to="/register"
      icon={logoutIcon}
      pagecolor={pageContext}
    />
  </MainWrapper>
);

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAction()),
});

Sidebar.propTypes = {
  pageContext: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(withContext(Sidebar));
