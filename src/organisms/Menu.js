import React, { Fragment, useState } from 'react';
import styled, { css } from 'styled-components';
import HomepantryIcon from '../assets/icons/homepantry.png';
import ListIcon from '../assets/icons/list.png';
import SettingsIcon from '../assets/icons/settings.png';
import MenuIcon from '../assets/icons/menu.png';
import { NavLink } from 'react-router-dom';
import { ButtonIcon } from '../components/ButtonIcon/ButtonIcon';

const StyledWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.backgroundColor.main};
  width: 12vw;
  height: 100vh;
  padding-top: 20px;

  ${({ isVisible }) =>
    isVisible &&
    css`
      opacity: 0.1;
    `};

  @media (max-width: 374px) {
    top: 0;
    left: -12vw;

    ${({ toggleMenu }) =>
      toggleMenu &&
      css`
        top: 0;
        left: 0;
        background-color: ${({ theme }) => theme.backgroundColor.main};
      `}
  }
`;

const StyledButtonIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  justify-items: center;
  height: 50%;
`;

const LogoWrapper = styled.div`
  font-family: 'Pacifico', cursive;
  height: 20%;

  span {
    display: block;
    margin: 0 auto;
    width: 50%;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.xxl};
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

    @media (max-width: 374px) {
      font-size: ${({ theme }) => theme.fontSize.medium};
    }
    @media (min-width: 375px) and (max-width: 768px) {
      font-size: ${({ theme }) => theme.fontSize.normal};
    }
  }
`;

const WrapperFlyoutMenu = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: -10vw;
  background-color: ${({ theme }) => theme.backgroundColor.main};
  width: 10vw;
  height: 100vh;

  @media (max-width: 374px) {
    display: block;

    ${({ visibleMenu }) =>
      visibleMenu &&
      css`
        top: 0;
        left: 0;
      `}
  }
`;

const MenuButtonIcon = styled(ButtonIcon)`
  display: none;
  position: absolute;
  top: 95%;
  left: 5%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  background-color: transparent;

  @media (max-width: 374px) {
    display: block;

    /* po kliknięciu gdy wysunie się menu, przycisk będzie musiał przybrać barwy wysuwanego menu */
    ${({ isColored }) =>
      isColored &&
      css`
        background-color: ${({ theme }) => theme.backgroundColor.main};
      `}
  }
`;

const Menu = ({ children, isVisible, isNoClicked }) => {
  const [flyoutMenu, setFlyoutMenu] = useState(false);

  return (
    <>
      <StyledWrapper isVisible={isVisible} toggleMenu={flyoutMenu}>
        <LogoWrapper>
          <span>
            Home <br /> Pantry
          </span>
        </LogoWrapper>
        <StyledButtonIconWrapper>
          <ButtonIcon
            as={NavLink}
            to={'/homepantry'}
            icon={HomepantryIcon}
            activeclass="active"
            disabled={isNoClicked}
          />
          <ButtonIcon
            as={NavLink}
            to={'/shoppinglist'}
            icon={ListIcon}
            activeclass="active"
            disabled={isNoClicked}
          />
          <ButtonIcon
            as={NavLink}
            to={'/settings'}
            icon={SettingsIcon}
            activeclass="active"
            disabled={isNoClicked}
          />
        </StyledButtonIconWrapper>

        {children}
      </StyledWrapper>
      {console.log(`ISnoClicked ${isNoClicked}`)}
      <MenuButtonIcon
        icon={MenuIcon}
        onClick={() => setFlyoutMenu(!flyoutMenu)}
        isColored={flyoutMenu}
        disabled={isNoClicked}
      ></MenuButtonIcon>
    </>
  );
};

export default Menu;
