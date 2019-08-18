import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import logo from "../../images/boomtown.svg";

const styles = {
  row: {
    display: "flex",
    justifyContent: "center"
  },
  avatar: {
    margin: 0,
    overflow: "visible"
  },
  bigAvatar: {
    height: 48
  }
};

function ImageAvatars(props) {
  const { classes } = props;
  return <img src={logo} alt="Boomtown Logo" className={classes.bigAvatar} />;
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ImageAvatars);
