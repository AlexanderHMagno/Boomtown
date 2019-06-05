import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import LongMenu from "./menu";
import AddIcon from "@material-ui/icons/Add";
import Avatar from "./avatar";
import { Link } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1
  },
  AppBar: {
    height: 64
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -20,
    marginRight: 20
  },
  link_to: {
    textDecoration: "none",
    color: "black"
  },
  link_button_menu: {
    marginRight: 20,
    borderRadius: 25,
    padding: 15
  },
  button_menu: {
    marginRight: 10,
    height: 20,
    width: 20,
    background: "black"
  },
  button_menu_icon: {
    fontSize: 15
  },
  link: {
    margin: 10
  }
};

//TODO: When to show the link
const path_share = window.location.pathname === "/share";

function ButtonAppBar(props) {
  const { classes } = props;

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
          {true && (
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

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
