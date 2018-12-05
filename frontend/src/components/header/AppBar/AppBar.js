import React, {Component} from 'react';
import AppBarUI from '@material-ui/core/AppBar';
import ToolBarUI from '@material-ui/core/Toolbar';
import MenuIconUI from '@material-ui/icons/Menu';
import IconButtonUI from '@material-ui/core/IconButton';
import TypographyUI from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MuiThemeProviderUI from '@material-ui/core/styles/MuiThemeProvider';
import {lightTheme} from '../../../utils/themeLight';
import Link from "react-router-dom/es/Link";
import Menu from "@material-ui/core/Menu/Menu";
import IconButton from "@material-ui/core/IconButton/IconButton";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import AccountIcon from "@material-ui/icons/AccountCircle";
import Drawer from "@material-ui/core/Drawer/Drawer";
import Divider from "@material-ui/core/Divider/Divider";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
        display:'flex',
    },
    appBar: {
        zIndex: theme.zIndex.appBar +1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    drawer: {
        zIndex: 1,
        width: drawerWidth,
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
        auth: true,
        anchorEl: null,
        sidebarOpen: false,
    };

    handleAccountMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleSideMenu = () => {
        this.setState({sidebarOpen: !this.state.sidebarOpen});
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const {classes} = this.props;
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);

        //Should return a array, as MenuList does not accept fragments as children
        let menuItems = [
            <MenuItem key="A" id="register-menu-link" component={Link} to="/register" onClick={this.handleClose}>Register</MenuItem>,
            <MenuItem key="B" id="register-menu-link" component={Link} to="/login" onClick={this.handleClose}>Login</MenuItem>
            ];
        

        if (this.props.isAuthenticated) {
            menuItems = [
                    <MenuItem key="A" id="register-menu-link" component={Link} to="/edit" onClick={this.handleClose}>Edit Profile</MenuItem>,
                    <MenuItem key="B" id="register-menu-link" component={Link} to="/logout" onClick={this.handleClose}>Logout</MenuItem>
            ];
        }

        let sidebarItems = (
            <>
                <MenuItem id="home-menu-link" component={Link} to="/" color="inherit"
                    onClick={this.handleSideMenu}>
                    Home
                        </MenuItem>
                <MenuItem id="hw-menu-link" component={Link} to="/helloworld" color="inherit"
                    onClick={this.handleSideMenu}>
                    Hello World
                        </MenuItem>
                <Divider />
                <MenuItem id="faq-menu-link" component={Link} to="/faq" color="inherit"
                    onClick={this.handleSideMenu}>
                    FAQ
                </MenuItem>
            </>
        );

        if (this.props.isAuthenticated) {
           /* sidebarItems += (
                <>
                </>
            ); */
        }

        return (

            <div className={classes.root}>
                <MuiThemeProviderUI theme={lightTheme}>
                    <AppBarUI position="static" color="primary" className={classes.appBar}>
                        <ToolBarUI>
                            <IconButtonUI color="inherit" className={classes.menuButton} onClick={this.handleSideMenu}>
                                <MenuIconUI/>
                            </IconButtonUI>

                            <TypographyUI variant="h6" color="inherit" className={classes.grow}>
                                Flashcard Community
                            </TypographyUI>

                            { this.props.isAuthenticated ? (
                                <TypographyUI variant="subtitle2" color="inherit" className={classes.grow} align={'right'}>
                                    { this.props.username }
                                </TypographyUI>
                            ) : null}
                            
                            <div>
                                <IconButton id="account-icon"
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
                                    { menuItems }
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
                        <div className={classes.drawerHeader}>
                        </div>
                        <Divider/>

                        { sidebarItems }

                    </Drawer>
                </MuiThemeProviderUI>
            </div>
        );
    }
}

AppBar.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AppBar);