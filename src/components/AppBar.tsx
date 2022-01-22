import React, { FC, useState, MouseEvent } from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Privacy from '../components/Privacy';
import { useOvermind } from '../overmind';
import { breaks } from '../utils/media';
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
  ${breaks.phone} {
    margin-left: 12px;
  }
`;
const Span = styled.span`
  padding: 20px 0;
`;

const Img = styled.img`
  height: 50px;
  background-color: #ffffff;
  border-radius: 50%;
  margin: 5px 1em 5px 5px;
  padding: 5px;
`;

const Name = styled.span`
  ${breaks.phone} {
    display: none;
  }
`;

const MenuAppBar: FC = () => {
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
    <AppBar position="fixed" color="primary" style={{ top: 0, bottom: 'auto' }}>
      <Toolbar>
        <Title>
          {state.isLoggedIn ? (
            <>
              <Img src={imageElement} alt="logo" />
              <Span>{state.pageTitle}</Span>
            </>) : (
            <Span>Duurzaamheid checklist van de Groene Giraf</Span>
          )}
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
              <MenuItem>
                <Privacy handleClose={handleClose} />
              </MenuItem>

              <MenuItem onClick={handleLogOut}>
                <ExitToAppIcon />
                Uitloggen
              </MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MenuAppBar;
