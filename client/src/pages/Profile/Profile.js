import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Gravatar from "react-gravatar";
import { FormHelperText } from "@material-ui/core";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    minHeight: 250,
    width: "90%",
    margin: "auto",
    marginTop: "50px"
  }),
  title_Container: {
    display: "flex",
    alignItems: "center"
  },
  userName: {
    fontSize: "50px",
    display: "inline",
    textTransform: "Capitalize",
    marginLeft: "15px"
  },
  gravatar: {
    borderRadius: "50%"
  }
});

function Profile(props) {
  const { classes, viewer } = props;
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <div className={classes.title_Container}>
          <Gravatar
            email={viewer.email + "/d=retro"}
            className={classes.gravatar}
          />
          <Typography
            variant="headline"
            component="h3"
            className={classes.userName}
          >
            {viewer.fullname}
          </Typography>
        </div>
        <Typography component="p">
          0 Items shared 0 Items borrowed
          <br />
          {viewer.bio ? viewer.bio : '"No bio provided."'}
        </Typography>
      </Paper>
    </div>
  );
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
