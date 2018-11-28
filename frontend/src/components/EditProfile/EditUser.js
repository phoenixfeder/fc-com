import React, {Component} from 'react';
import MuiThemeProviderUI from "@material-ui/core/styles/MuiThemeProvider";
import {lightTheme} from "../../utils/themeLight";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/es/styles/withStyles";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import Dialog from "@material-ui/core/Dialog/Dialog";
import PasswordIcon from '@material-ui/icons/Lock'
import EMailIcon from '@material-ui/icons/Mail'
import CakeIcon from '@material-ui/icons/Cake'
import HobbyIcon from '@material-ui/icons/InsertEmoticon'
import RealNameIcon from '@material-ui/icons/Face'
import Divider from "@material-ui/core/Divider/Divider";
import AppBar from "@material-ui/core/es/AppBar/AppBar";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import * as PropTypes from "prop-types";


const styles = theme => ({
    root: {
        paddingTop: theme.spacing.unit * 2,
        flexGrow: 1,
    },
    headline: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    editProfileEntry: {
        paddingTop: theme.spacing.unit * 2,
    }
});

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};



class EditUser extends Component {

    state = {};

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>

                <MuiThemeProviderUI theme={lightTheme}>

                    <Grid container justify="center">


                        <Grid item sm={12} md={8} lg={6}>


                            <Grid container justify="center" spacing={16}
                                  elevation={2} direction={"column"}>

                                <Grid container spacing={16}>
                                    <Grid item sm={12} md={12} lg={12}>
                                        <Typography variant="h4" component="h3">
                                            Edit User
                                        </Typography>
                                        <Typography component="p" className={classes.headline}>
                                            Here you can edit your profile and/or add additional information. To really
                                            know
                                            it is you
                                            updating your profile, please type in your current password.<br/>
                                        </Typography>
                                    </Grid>

                                    <Grid item sm={12} md={12} lg={12}>
                                        <Divider/>
                                        <Typography component="p" className={classes.headline}>
                                            Those information will be displayed on your profile, but aren't needed and
                                            not
                                            providing
                                            those information won't lead to any disadvantages.<br/>
                                        </Typography>
                                        <FormControl required={false}>
                                            <InputLabel>Real Name</InputLabel>
                                            <Input id={'realName-input'} type="text" startAdornment={
                                                <InputAdornment position="start">
                                                    <RealNameIcon/>
                                                </InputAdornment>
                                            }
                                                   value={this.state.realName}
                                                   onChange={this.handleValueChange}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12}>
                                        <FormControl required={false}>
                                            <InputLabel>Interest</InputLabel>
                                            <Input id={'interest-input'} multiline rowsMax="4" type="text" startAdornment={
                                                <InputAdornment position="start">
                                                    <HobbyIcon/>
                                                </InputAdornment>
                                            }
                                                   value={this.state.interest}
                                                   onChange={this.handleValueChange}
                                            />
                                            <FormHelperText><em>Max 200 characters</em></FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12}>
                                        <FormControl required={false}>
                                            <InputLabel>Date of birth</InputLabel>
                                            <Input id={'date-input'} type="date" startAdornment={
                                                <InputAdornment position="start">
                                                    <CakeIcon/>
                                                </InputAdornment>
                                            }
                                                   value={this.state.birthday}
                                                   onChange={this.handleValueChange}
                                            />
                                            <FormHelperText><em>You know, a day in the past or are you Marty
                                                McFly?</em></FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12}>
                                        <Button variant="contained" color="primary" onClick={() => console.log(this.state)}>
                                            Update Profile
                                        </Button>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </MuiThemeProviderUI>
            </div>
        );
    }

    handleValueChange = (event) => {
        switch (event.target.id) {
            case 'date-input':
        this.setState({birthday: event.target.value});
                break;
            case 'interest-input':
                this.setState({interest: event.target.value});
                break;
            case 'realName-input':
                this.setState({realName: event.target.value});
                break;

        }
    }
}
EditUser.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(EditUser);