import React from "react";
import Card from "./Card";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

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
    const { spacing } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={40} className={classes.gridContainer}>
          {items.map(element => (
            <Grid item xs={12} sm={6} md={4}>
              <Card
                item_owner={element.itemowner.fullname}
                title={element.title}
                description={element.description}
                imageUrl={element.imageurl}
                tags={element.tags}
                item_id={element.id}
              />
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

// <div className={classes.root}>
//   <Grid container spacing={24}>
//     <Grid item xs={24} sm={12} md={8}>
//       <Paper className={classes.paper}>xs=6 sm=3</Paper>
//     </Grid>
//   </Grid>
// </div>;

// <div style={divStyle}>
//   <ul style={ulStyle}>
//     {items.map(element => (
//       <li style={liStyle} key={element.id}>
//         <Card
//           item_owner={element.itemowner.fullname}
//           title={element.title}
//           description={element.description}
//           imageUrl={element.imageurl}
//           item_id={element.id}
//         />
//       </li>
//     ))}
//   </ul>
// </div>;
