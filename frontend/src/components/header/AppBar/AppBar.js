import AppBarUI from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider/Divider';
import Drawer from '@material-ui/core/Drawer/Drawer';
import IconButtonUI from '@material-ui/core/IconButton';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Menu from '@material-ui/core/Menu/Menu';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ToolBarUI from '@material-ui/core/Toolbar';
import TypographyUI from '@material-ui/core/Typography';
import AccountIcon from '@material-ui/icons/AccountCircle';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Link from 'react-router-dom/es/Link';
import MuiThemeProviderUI from '@material-ui/core/styles/MuiThemeProvider';
import MenuIconUI from '@material-ui/icons/Menu';
import { lightTheme } from '../../../utils/themeLight';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.appBar + 11,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  drawer: {
    zIndex: 120, // Manage Flashcards selector index is 110
    width: 0,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class AppBar extends Component {
  state = {
    anchorEl: null,
    sidebarOpen: false,
  };

  handleAccountMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSideMenu = () => {
    this.setState(prevState => ({ sidebarOpen: !prevState.sidebarOpen }));
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    // Should return a array, as MenuList does not accept fragments as children
    let menuItems = [
      <MenuItem key="A" id="register-menu-link" component={Link} to="/register" onClick={this.handleClose}>Register</MenuItem>,
      <MenuItem key="B" id="register-menu-link" component={Link} to="/login" onClick={this.handleClose}>Login</MenuItem>,
    ];


    if (this.props.isAuthenticated) {
      menuItems = [
        <MenuItem key="A" id="register-menu-link" component={Link} to="/edit" onClick={this.handleClose}>Edit Profile</MenuItem>,
        <MenuItem key="B" id="register-menu-link" component={Link} to="/logout" onClick={this.handleClose}>Logout</MenuItem>,
      ];
    }

    let sidebarItems = (
      <>
        <MenuItem
          id="home-menu-link"
          component={Link}
          to="/"
          color="inherit"
          onClick={this.handleSideMenu}
        >
          {'Home'}
        </MenuItem>
        <MenuItem
          id="hw-menu-link"
          component={Link}
          to="/helloworld"
          color="inherit"
          onClick={this.handleSideMenu}
        >
          {'Hello World'}
        </MenuItem>
        <Divider />
        <MenuItem
          id="faq-menu-link"
          component={Link}
          to="/faq"
          color="inherit"
          onClick={this.handleSideMenu}
        >
          {'FAQ'}
        </MenuItem>
      </>
    );

    if (this.props.isAuthenticated) {
      sidebarItems = (
        <>
          <MenuItem
            id="home-menu-link"
            component={Link}
            to="/"
            color="inherit"
            onClick={this.handleSideMenu}
          >
            {'Home'}
          </MenuItem>
          <MenuItem
            id="home-menu-link"
            component={Link}
            to="/boxes"
            color="inherit"
            onClick={this.handleSideMenu}
          >
            {'Flashcardboxes'}
          </MenuItem>
          <MenuItem
            id="hw-menu-link"
            component={Link}
            to="/helloworld"
            color="inherit"
            onClick={this.handleSideMenu}
          >
            {'Hello World'}
          </MenuItem>
          <Divider />
          <MenuItem
            id="faq-menu-link"
            component={Link}
            to="/faq"
            color="inherit"
            onClick={this.handleSideMenu}
          >
            {'FAQ'}
          </MenuItem>
        </>
      );
    }

    return (
      <div className={classes.root}>
        <MuiThemeProviderUI theme={lightTheme}>
          <AppBarUI position="static" color="primary" className={classes.appBar}>
            <ToolBarUI>
              <IconButtonUI color="inherit" className={classes.menuButton} onClick={this.handleSideMenu}>
                <MenuIconUI />
              </IconButtonUI>

              <TypographyUI variant="h6" color="inherit" className={classes.grow}>Flashcard Community</TypographyUI>

              {this.props.isAuthenticated ? (
                <TypographyUI variant="subtitle2" color="inherit" className={classes.grow} align="right">
                  {this.props.username}
                </TypographyUI>
              ) : null}

              <div>
                <IconButton
                  id="account-icon"
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleAccountMenu}
                  color="inherit"
                >
                  <AccountIcon />
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
                  {menuItems}
                </Menu>
              </div>
            </ToolBarUI>
          </AppBarUI>

          {/* TODO : User own SideBar-Component instead of Drawer */}

          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={this.state.sidebarOpen}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader} />
            <Divider />

            {sidebarItems}

          </Drawer>
        </MuiThemeProviderUI>
      </div>
    );
  }
}


AppBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  username: PropTypes.string,
};

AppBar.defaultProps = {
  username: '',
};

export default withStyles(styles, { withTheme: true })(AppBar);
