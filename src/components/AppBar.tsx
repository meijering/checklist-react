import React, { useState, MouseEvent } from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useOvermind } from '../overmind';
import { media } from '../utils/media';
import imageElement from '../assets/logo-max.png';

const Toolbar = styled.div`
  max-width: 1000px;
  width: calc(100% - 5px);
  margin: 0px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: sans-serif;
`;

const Title = styled.div`
  display: flex;
  margin-top: 2px;
  align-items: center;
  font-variant: small-caps;
  font-size: 25px;
  font-family: sans-serif;
  ${media.phone`
    margin-left: 12px;
    font-size: 15px;
  `}
`;
const Span = styled.span`
  padding: 20px 0;
`;

const Img = styled.img`
  height: 50px;
  background-color: #ffffff;
  border-radius: 50%;
  margin: 5px;
  padding: 5px;
  ${media.phone`
    display: none;
  `}
`;

const Name = styled.span`
  ${media.phone`
    display: none;
  `}
`;

const MenuAppBar: React.FC = () => {
  const { state, actions }: any = useOvermind();
  const [anchorEl, setAnchorEl] = useState<any>(null);

  const handleMenu = (event: MouseEvent): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleLogOut = (): void => {
    actions.logoutUser();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <AppBar position="static">
      <Toolbar>
        <Title>
          {state.isLoggedIn && <Img src={imageElement} alt="logo" />}
          <Span>Duurzaamheid checklist van de Groene Giraf</Span>
        </Title>
        {state.isLoggedIn && (
          <div>
            <Name>
              {state.user && 'naam' in state.user && state.user.naam}
            </Name>
            <IconButton
              aria-owns={open ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogOut}>Uitloggen</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MenuAppBar;
