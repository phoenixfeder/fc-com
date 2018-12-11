import React, {Component} from 'react';
import {BACKEND_URL_GETFLASHCARD} from '../../utils/const-paths';
import Flashcard from '../Flashcard/Flashcard';
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import {lightTheme} from "../../utils/themeLight";
import MuiThemeProviderUI from "@material-ui/core/styles/MuiThemeProvider";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Button from "@material-ui/core/Button/Button";

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
});

class HelloWorld extends Component {

    componentDidMount(){
        document.title='HelloWorld';
    }

    componentWillMount() {
        fetch(BACKEND_URL_GETFLASHCARD(100000))
        .then(results => {
            return results.json();
        })
        //.then(result => this.props.updateFlashcard(result))
        .then(result => this.props.updateFlashcard(result))

    }

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root} id="helloworld">

                <MuiThemeProviderUI theme={lightTheme}>

                    <Grid container justify="center">


                        <Grid item sm={12} md={8} lg={6}>

                            <Grid container justify="center" alignContent="center" spacing={16} className={classes.paper} component={Paper}
                                elevation={2} direction={"column"}>

                                <Grid item lg={12}>
                                    <Typography variant="h3" align="center">
                                        Hello World
                                    </Typography>
                                    <Typography variant="body1" align="center">
                                        Just a small presentation about how a flashcard could look like. This is not mobile responsive yet!
                                    </Typography>
                                </Grid>

                                <Grid item sm={12} md={12} lg={12} style={{ alignSelf: "center"}}>
                                    <Flashcard flashcard={this.props.flashcard} />
                                </Grid>

                                <Grid item sm={12} md={12} lg={12} style={{ alignSelf: "center" }}>
                                    <Button id="turn-button" variant="contained" color="primary" style={{ align: "center" }}
                                        onClick={() => { setTextToBackText(this.props.flashcard); this.forceUpdate() }}>
                                        Turn around
                                    </Button>
                                </Grid>

                            </Grid>
                        </Grid>

                    </Grid>
                </MuiThemeProviderUI>
            </div>
        );
    }

}
function setTextToBackText(flashcard) {
    var oldText = flashcard.frontText
    flashcard.frontText = flashcard.backText
    flashcard.backText = oldText
}
export default withStyles(styles)(HelloWorld);