import {
  AppBar,
  Button,
  Divider,
  Fade,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  SwipeableDrawer,
  Toolbar,
  Typography,
  withStyles,
  withWidth,
} from '@material-ui/core/';
import AccountIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
  },
  appBar: {},
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
    padding: '0 10px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
    link: '/select_learning',
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

class Appbar extends Component {
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
              <Typography variant="subtitle2" color="inherit">
                {item.title}
              </Typography>
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
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent); // see https://material-ui.com/demos/drawers/

    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary" className={classes.appBar}>
          <Toolbar>
            <div className={classes.sectionMobile}>
              <IconButton color="inherit" className={classes.menuButton} onClick={this.handleSideMenu}>
                <MenuIcon />
              </IconButton>
            </div>
            <Typography variant="h6" color="inherit" className={classes.title}>Flashcard Community</Typography>
            <div className={classes.grow}>
              <div className={classes.sectionDesktop}>
                {isAuthenticated ? this.renderAppBarMenu(menuOnAuth) : this.renderAppBarMenu(menu)}
                {isAuthenticated ? (
                  <Typography variant="subtitle2" color="inherit">
                    {username}
                  </Typography>
                ) : null}
                {isAuthenticated ? this.renderUserIcon(userMenuOnAuth) : this.renderUserIcon(userMenu)}
              </div>
              <div className={classes.sectionMobile}>
                {isAuthenticated ? this.renderUserIcon(userMenuOnAuth) : this.renderUserIcon(userMenu)}
              </div>
            </div>
          </Toolbar>
        </AppBar>

        <div classes={classes.sectionMobile}>
          <SwipeableDrawer
            className={classes.drawer}
            anchor="left"
            open={this.state.sidebarOpen}
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            onOpen={() => this.setState({ sidebarOpen: true })}
            onClose={() => this.setState({ sidebarOpen: false })}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <Typography variant="subtitle2">
                {'Menu'}
              </Typography>
            </div>
            <Divider />
            {isAuthenticated ? this.renderDrawerMenu(menuOnAuth) : this.renderDrawerMenu(menu)}
          </SwipeableDrawer>
        </div>
        {<Fade
          in={this.props.isLoading}
          style={{
            transitionDelay: this.props.isLoading ? '500ms' : '0ms',
          }}
          unmountOnExit
        >
          <LinearProgress />
        </Fade>}
      </div>
    );
  }

}


Appbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  username: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
};

Appbar.defaultProps = {
  username: '-',
};

AppBar.defaultProps = {
  username: '',
};

export default compose(withStyles(styles, { withTheme: true }), withWidth())(Appbar);
