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
import EditUserContainer from "./EditUser-container";
import EditAccountContainer from "./EditAccount-container";
import qs from "query-string";
import {BACKEND_URL} from "../../utils/const-paths";

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

    state = {
        openCloseAccount: false,
        hasEditPermission: false,
        value: 0,
    };

    componentWillMount() {

        let targetUserID = qs.parse(window.location.search).userID !== undefined ? qs.parse(window.location.search).userID : this.props.userID;

        fetch(BACKEND_URL + '/edit/canEditUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user": {
                    "session": this.props.session,
                    "sessionHash": this.props.sessionHash,
                    "userID": this.props.userID,
                    "data":{
                        "targetUserID": targetUserID,
                    }
                }
            })
        }).then(results => {
                return results.json();
            })
            .then(result => {

                switch(result.status.code) {

                    case 200:
                        this.setState({hasEditPermission: true});
                        break;

                    default:
                        console.log(result.status.code);
                        break;
                }
            }).catch(err => {
            console.log(err);
        });
        this.setState({hasEditPermission: true});
    }

    componentDidMount(){
        document.title='Edit Profile';
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>

                <MuiThemeProviderUI theme={lightTheme}>

                    <Grid container justify="center">

                        {this.state.hasEditPermission ?

                        <Grid item sm={12} md={8} lg={6}>

                            <Grid container justify="center" spacing={16} className={classes.paper} component={Paper}
                                  elevation={2} direction={"column"}>

                                <Tabs fullWidth value={this.state.value} onChange={this.handleChange}>
                                    <LinkTab label={"Edit User"} style={{textAlign:'center'}} href = "page1"/>
                                    <LinkTab label={"Edit Account"} style={{textAlign:'center'}} href = "page2"/>
                                </Tabs>

                                {this.state.value === 0 && <TabContainer><EditUserContainer/></TabContainer>}
                                {this.state.value === 1 && <TabContainer><EditAccountContainer/></TabContainer>}

                            </Grid>
                        </Grid>

                        :

                        <Grid item sm={12} md={12} lg={12}>
                            <Typography variant="h4" component="h3">
                                Edit User
                            </Typography>
                            <Typography component="p" className={classes.headline}>
                                You don´t have the permission to edit this user
                            </Typography>
                        </Grid>
                        }
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