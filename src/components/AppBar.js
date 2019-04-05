import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { media } from '../utils/media';
import imageElement from '../assets/logo-max.png';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    fontVariant: 'small-caps',
    fontSize: '25px',
    marginLeft: '10px',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const Img = styled.img`
  height: 55px;
  background-color: #ffffff;
  border-radius: 50%;
  margin-top: 2px;
  ${media.phone`
    display: none;
  `}
`;

const MenuAppBar = ({
  logoutUser, classes, loggedIn, user,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    logoutUser();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <AppBar position="static">
      <Toolbar>
        {loggedIn && <Img src={imageElement} alt="logo" />}
        <Typography variant="h6" color="inherit" className={classes.grow}>
          <span>checklist</span>
        </Typography>
        {loggedIn && (
          <React.Fragment>
            {user.naam}
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
              <MenuItem onClick={handleClose}>Mijn gegevens</MenuItem>
              <MenuItem onClick={handleLogOut}>Uitloggen</MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

MenuAppBar.propTypes = {
  classes: PropTypes.shape().isRequired,
  loggedIn: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.shape().isRequired,
};

export default withStyles(styles)(MenuAppBar);
