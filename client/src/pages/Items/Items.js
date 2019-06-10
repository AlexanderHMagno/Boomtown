import React from "react";
import Card from "./Card";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";

const styles = theme => ({
  root: {
    background: "black"
  },
  gridContainer: {
    paddingTop: 50,
    width: "90%",
    margin: "auto",
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

class Items extends React.Component {
  state = {
    spacing: "16"
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value
    });
  };
  render() {
    const { classes, items } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={40} className={classes.gridContainer}>
          {items.map(element => (
            <Grid item xs={12} sm={6} md={4}>
              <Grow>
                <Card element={element} />
              </Grow>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

Items.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Items);
