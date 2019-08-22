import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Gravatar from "react-gravatar";
import styles, { imageBase } from "./styles";
import { withRouter } from "react-router-dom";
import timer from "./hourConverter";

class ItemCard extends React.Component {
  state = {
    itemAvailable: "visible"
  };

  buttonPressedToggle() {
    // this.props.history.push("/profile");
    // this.props.history.goBack();
    this.setState({
      itemAvailable: !this.state.itemAvailable
    });
    console.log(this.props);
  }
  render() {
    const {
      classes,
      element: { title, description, tags, imageurl, itemowner, created },
      match: { path }
    } = this.props;
    const fetchImg = imageurl == null ? imageBase : imageurl;
    const posted = timer(created);

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={fetchImg}
          title={description}
        />
        <CardContent>
          <div className={classes.userInfoContainer}>
            <div>
              <Gravatar
                email={itemowner.fullname + "@red.com/d=retro"}
                className={classes.gravatar}
              />
            </div>
            <div className={classes.userInfoRight}>
              <Typography
                gutterBottom
                fontSize={12}
                component="span"
                className={classes.userSpan}
              >
                {itemowner.fullname}
              </Typography>
              <Typography
                gutterBottom
                fontSize={2}
                component="span"
                className={classes.userSpan}
              >
                {posted}
              </Typography>
            </div>
          </div>
          <Typography gutterBottom variant="headline" component="h2">
            {title}
          </Typography>

          {tags.map(tag => {
            return (
              <Typography
                key={tag.id}
                gutterBottom
                component="span"
                className={classes.spanTags}
              >
                {tag.title}
              </Typography>
            );
          })}
          <Typography
            gutterBottom
            component="span"
            className={classes.spanTags}
          />
          <Typography component="p">{description}</Typography>
          {path !== "/profile" && (
            <Button
              variant="outlined"
              className={classes.button}
              onClick={() => this.buttonPressedToggle()}
              id={1}
            >
              {this.state.itemAvailable ? "BORROW" : "Return"}
            </Button>
          )}
        </CardContent>
        <CardActions />
      </Card>
    );
  }
}

ItemCard.propTypes = {
  classes: PropTypes.object,
  element: PropTypes.object
};

export default withRouter(withStyles(styles)(ItemCard));
