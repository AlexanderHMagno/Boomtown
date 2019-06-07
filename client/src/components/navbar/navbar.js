import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import LongMenu from "./menu";
import AddIcon from "@material-ui/icons/Add";
import Avatar from "./avatar";
import { Link } from "react-router-dom";
import styles from "./styles";

class ButtonAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { location: "" };
  }
  componentWillReceiveProps() {
    this.setState({
      location: window.location.pathname
    });
  }

  render() {
    const { classes } = this.props;
    const share_location = this.state.location === "/share";

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.AppBar}>
          <Toolbar>
            <Link to="/items" className={classes.link}>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
              >
                <Avatar />
              </IconButton>
            </Link>

            <Typography color="inherit" className={classes.grow} />
            {!share_location && (
              <Link to="/share" className={classes.link_to}>
                <Button color="inherit" className={classes.link_button_menu}>
                  <IconButton
                    className={classes.button_menu}
                    aria-label="Add to share something"
                    disabled
                  >
                    <AddIcon
                      color="primary"
                      className={classes.button_menu_icon}
                    />
                  </IconButton>
                  Share something
                </Button>
              </Link>
            )}

            <LongMenu />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
