import withStyles from '@material-ui/core/es/styles/withStyles';
import Grid from '@material-ui/core/Grid/Grid';
import Tab from '@material-ui/core/Tab/Tab';
import Tabs from '@material-ui/core/Tabs/Tabs';
import Typography from '@material-ui/core/Typography/Typography';
import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import EditAccountContainer from './EditAccount-container';
import EditUserContainer from './EditUser-container';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing(2),
    flexGrow: 1,
  },
});

function TabContainer(props) {
  const { children } = props;
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
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
    value: 0,
  };

  componentDidMount() {
    document.title = 'Edit Profile';
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid item sm={12} md={8} lg={6}>
            <Grid
              container
              justify="center"
              spacing={5}
              elevation={2}
              direction="column"
            >
              <Tabs variant="fullWidth" value={value} onChange={this.handleChange}>
                <LinkTab label="Edit User" style={{ textAlign: 'center' }} href="page1" />
                <LinkTab label="Edit Account" style={{ textAlign: 'center' }} href="page2" />
              </Tabs>
              {value === 0 && <TabContainer>
                <EditUserContainer />
              </TabContainer>}
              {value === 1 && <TabContainer>
                <EditAccountContainer />
              </TabContainer>}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditProfile);
