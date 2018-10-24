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
    render() {
        const {classes} = this.props;
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
                            <ButtonUI component={Link} to="/register" color="inherit">
                                Register
                            </ButtonUI>
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