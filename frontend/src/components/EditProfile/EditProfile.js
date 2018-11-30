import React, {Component} from 'react';
import MuiThemeProviderUI from "@material-ui/core/styles/MuiThemeProvider";
import {lightTheme} from "../../utils/themeLight";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import * as PropTypes from "prop-types";
import EditUser from "./EditUser";
import EditAccount from "./EditAccount";

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

function LinkTab(props) {
    return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}

class EditProfile extends Component {

    componentDidMount(){
        document.title='Edit Profile';
    }

    state = {
        openCloseAccount: false,
        value: 0,
    };

    handleClickOpenCloseAccount = () => {
        this.setState({openCloseAccount: true});
    };

    handleCloseCloseAccount = () => {
        this.setState({openCloseAccount: false});
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>

                <MuiThemeProviderUI theme={lightTheme}>

                    <Grid container justify="center">




                        <Grid item sm={12} md={8} lg={6}>



                            <Grid container justify="center" spacing={16} className={classes.paper} component={Paper}
                                  elevation={2} direction={"column"}>

                                <Tabs fullWidth value={this.state.value} onChange={this.handleChange}>
                                    <LinkTab label={"Edit User"} style={{textAlign:'center'}} href = "page1"/>
                                    <LinkTab label={"Edit Account"} style={{textAlign:'center'}} href = "page2"/>
                                </Tabs>


                                {this.state.value === 0 && <TabContainer><EditUser/></TabContainer>}
                                {this.state.value === 1 && <TabContainer><EditAccount/></TabContainer>}



                            </Grid>
                        </Grid>
                    </Grid>
                </MuiThemeProviderUI>
            </div>
        );
    }

}
EditProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(EditProfile);