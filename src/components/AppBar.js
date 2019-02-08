import React from 'react';
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

class MenuAppBar extends React.Component {
  state = {
    anchorEl: null,
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleLogOut = () => {
    this.props.logoutUser();
    this.setState({ anchorEl: null });
  };

  render() {
    const {
      classes,
      loggedIn,
      user,
    } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
        <AppBar position="static">
          <Toolbar>
            {loggedIn && <Img src={imageElement} alt="logo" />}
            <Typography variant="title" color="inherit" className={classes.grow}>
              <span>checklist</span>
            </Typography>
            {loggedIn && (
              <React.Fragment>
                {user.naam}
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
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
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Mijn gegevens</MenuItem>
                  <MenuItem onClick={this.handleLogOut}>Uitloggen</MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </Toolbar>
        </AppBar>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.shape().isRequired,
  loggedIn: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.shape().isRequired,
};

export default withStyles(styles)(MenuAppBar);
