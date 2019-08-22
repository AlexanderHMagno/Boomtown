import React from "react";
import Profile from "./Profile";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

let ProfileContainer = ({ classes }) => {
  return (
    <div className={classes.back}>
      <Profile />
    </div>
  );
};

export default withStyles(styles)(ProfileContainer);
