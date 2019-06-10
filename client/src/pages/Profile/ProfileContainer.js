import React, { Component } from "react";
import Profile from "./Profile";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

class ProfileContainer extends Component {
  render() {
    const { classes, viewer } = this.props;

    return (
      <div className={classes.back}>
        <Profile viewer={viewer} />
      </div>
    );
  }
}

export default withStyles(styles)(ProfileContainer);
