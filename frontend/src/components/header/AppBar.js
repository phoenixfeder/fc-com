import React from 'react';
import {Component} from 'react';
import AppBarUI from '@material-ui/core/AppBar';
import ToolBarUI from '@material-ui/core/Toolbar';
import MenuIconUI from '@material-ui/icons/Menu';
import IconButtonUI from '@material-ui/core/IconButton';
import ButtonUI from '@material-ui/core/Button';
import TypographyUI from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MuiThemeProviderUI from '@material-ui/core/styles/MuiThemeProvider';
import {lightTheme} from '../../utils/themeLight';
import Link from "react-router-dom/es/Link";
import Menu from "@material-ui/core/Menu/Menu";
import IconButton from "@material-ui/core/IconButton/IconButton";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import AccountIcon from "@material-ui/icons/AccountCircle";

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    }
};

class AppBar extends Component {

    state = {
        auth: true,
        anchorEl: null,
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const {classes} = this.props;
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);
        return (
            <div className={classes.root}>
                <MuiThemeProviderUI theme={lightTheme}>
                    <AppBarUI position="static" color="primary">
                        <ToolBarUI>
                            <IconButtonUI color="inherit" className={classes.menuButton}>
                                <MenuIconUI/>
                            </IconButtonUI>
                            <TypographyUI variant="h6" color="inherit" className={classes.grow}>
                                Flashcard Community
                            </TypographyUI>
                            <ButtonUI component={Link} to="/helloworld" color="inherit">
                                Hello World
                            </ButtonUI>
                            <ButtonUI component={Link} to="/faq" color="inherit">
                                FAQ
                            </ButtonUI>
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
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
                                    <MenuItem component={Link} to="/login" onClick={this.handleClose}>Login</MenuItem>
                                    <MenuItem component={Link} to="/register" onClick={this.handleClose}>Register</MenuItem>
                                </Menu>
                            </div>
                        </ToolBarUI>
                    </AppBarUI>
                </MuiThemeProviderUI>
            </div>
        );
    }
}

AppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBar);