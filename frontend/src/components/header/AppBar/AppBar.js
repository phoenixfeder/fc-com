import AppBarUI from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider/Divider';
import Drawer from '@material-ui/core/Drawer/Drawer';
import IconButtonUI from '@material-ui/core/IconButton';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Menu from '@material-ui/core/Menu/Menu';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Button from '@material-ui/core/Button';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import ToolBarUI from '@material-ui/core/Toolbar';
import TypographyUI from '@material-ui/core/Typography';
import AccountIcon from '@material-ui/icons/AccountCircle';
import MenuIconUI from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import React, { Component } from 'react';
import Link from 'react-router-dom/es/Link';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
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
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  },
  sectionMobile: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawer: {
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

const menu = [
  {
    id: 1,
    title: 'Home',
    link: '/home',
  },
  {
    id: 2,
    title: 'FAQ',
    link: '/faq',
  },
];

const menuOnAuth = [
  {
    id: 1,
    title: 'Home',
    link: '/home',
  },
  {
    id: 2,
    title: 'Learn',
    link: '/learn',
  },
  {
    id: 3,
    title: 'Boxes',
    link: '/boxes',
  },
  {
    id: 4,
    title: 'FAQ',
    link: '/faq',
  },
];

const userMenu = [
  {
    id: 1,
    title: 'Login',
    link: '/login',
  },
  {
    id: 2,
    title: 'Register',
    link: '/register',
  },
];

const userMenuOnAuth = [
  {
    id: 1,
    title: 'Edit Profile',
    link: '/edit',
  },
  {
    id: 2,
    title: 'Logout',
    link: '/logout',
  },
];

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

  renderAppBarMenu = menuItems => {
    const { classes } = this.props;
    return (
      <>
        {
          menuItems.map(item => (
            <Button
              color="inherit"
              className={classes.menuButton}
              key={item.id}
              component={Link}
              to={item.link}
            >
              <TypographyUI variant="subtitle2" color="inherit">
                {item.title}
              </TypographyUI>
            </Button>
          ))
        }
      </>
    );
  };

  renderDrawerMenu = menuItems => (
    <>
      {
        menuItems.map(item => (
          <MenuItem
            key={item.id}
            id={`${item.title}-menu-link`}
            component={Link}
            to={item.link}
            color="inherit"
            onClick={this.handleSideMenu}
          >
            {item.title}
          </MenuItem>
        ))
      }
    </>
  );

  renderUserIcon = userMenuItems => {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <>
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
          {
            userMenuItems.map(item => (
              <MenuItem
                key={item.id}
                id={`${item.title}-menu-link`}
                component={Link}
                to={item.link}
                color="inherit"
                onClick={this.handleClose}
              >
                {item.title}
              </MenuItem>
            ))
          }
        </Menu>
      </>
    );
  };

  render() {
    const { classes, isAuthenticated, username } = this.props;

    return (
      <div className={classes.root}>
        <AppBarUI position="static" color="primary" className={classes.appBar}>
          <ToolBarUI>
            <div className={classes.sectionMobile}>
              <IconButtonUI color="inherit" className={classes.menuButton} onClick={this.handleSideMenu}>
                <MenuIconUI />
              </IconButtonUI>
            </div>
            <TypographyUI variant="h6" color="inherit" className={classes.title}>Flashcard Community</TypographyUI>
            <div className={classes.grow}>
              <div className={classes.sectionDesktop}>
                {isAuthenticated ? this.renderAppBarMenu(menuOnAuth) : this.renderAppBarMenu(menu)}
                {isAuthenticated ? (
                  <TypographyUI variant="subtitle2" color="inherit">
                    {username}
                  </TypographyUI>
                ) : null}
                {isAuthenticated ? this.renderUserIcon(userMenuOnAuth) : this.renderUserIcon(userMenu)}
              </div>
              <div className={classes.sectionMobile}>
                {isAuthenticated ? this.renderUserIcon(userMenuOnAuth) : this.renderUserIcon(userMenu)}
              </div>
            </div>
          </ToolBarUI>
        </AppBarUI>

        <div classes={classes.sectionMobile}>
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

            {isAuthenticated ? this.renderDrawerMenu(menuOnAuth) : this.renderDrawerMenu(menu)}

          </Drawer>
        </div>
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

export default compose(withStyles(styles, { withTheme: true }), withWidth())(AppBar);
