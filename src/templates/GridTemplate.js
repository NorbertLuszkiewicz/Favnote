import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Sidebar from 'components/organisms/Sidebar/Sidebar';
import NewItemBar from 'components/organisms/NewItemBar/NewItemBar';
import Button from 'components/atoms/Button/Button';
import PlusIcon from 'assets/icons/plus.svg';
import { initialState } from 'reducers';

const GridWrapper = styled.div`
  width: 90%;
  margin: auto;
  display: grid;
  grid-row-gap: 5vh;
  @media screen and (min-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 5vw;
    padding-left: 150px;
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const OpenAdderItemButton = styled(Button)`
  width: 60px;
  height: 60px;
  position: fixed;
  bottom: 20px;
  left: calc(100% - 80px);
  border-radius: 50%;
  background-image: url(${PlusIcon});
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 50%;
`;

const GridTemplate = ({ children }) => {
  const { userID } = initialState;
  const [isNewItemBarVisible, handleNewItemBarToggle] = useState(false);

  const [localUserID, setlocalUserID] = useState(window.localStorage.getItem('userID') || '');

  const handleUserID = () => {
    if (userID) setlocalUserID(userID);
  };

  useEffect(() => {
    window.localStorage.setItem('userID', localUserID);
    handleUserID();
    initialState.userID = localUserID;
  }, [localUserID]);

  return (
    <>
      <Sidebar />
      <GridWrapper>{children}</GridWrapper>
      <NewItemBar isVisible={isNewItemBarVisible} handleClose={handleNewItemBarToggle} />
      <OpenAdderItemButton
        withBorder
        onClick={() => {
          handleNewItemBarToggle(!isNewItemBarVisible);
        }}
      />
    </>
  );
};

GridTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
};

export default GridTemplate;
