import React from "react";
import PropTypes, { element } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Gravatar from "react-gravatar";
import styles from "./styles";
import Profile from "../Profile";
import { Redirect, Route, Switch } from "react-router";
import { Link } from "react-router-dom";

class ItemCard extends React.Component {
  state = {
    location: "",
    button_pressed: false
  };
  componentDidMount() {
    this.setState({
      location: window.location.pathname
    });
  }

  button_pressed_toggle() {
    let new_state = !this.state.button_pressed;
    this.setState({
      button_pressed: new_state
    });
  }
  render() {
    const {
      classes,
      title,
      description,
      imageUrl,
      item_owner,
      item_id,
      tags
    } = this.props;

    let fetchImg =
      imageUrl == null
        ? "http://via.placeholder.com/350x250?text=Please%20select%20an%20image"
        : imageUrl;

    const share_location = this.state.location === "/profile";

    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={fetchImg}
            title={description}
          />
          <CardContent>
            <div className={classes.user_info_container}>
              <div>
                <Gravatar
                  email={item_owner.fullname + "@red.com/d=retro"}
                  className={classes.gravatar}
                />
              </div>
              <div className={classes.user_info_right}>
                <Typography
                  gutterBottom
                  fontSize={12}
                  component="span"
                  className={classes.user_span}
                >
                  {item_owner.fullname}
                </Typography>
                <Typography
                  gutterBottom
                  fontSize={2}
                  component="span"
                  className={classes.user_span}
                >
                  Hour TODO
                </Typography>
              </div>
            </div>
            <Typography gutterBottom variant="headline" component="h2">
              {title}
            </Typography>

            {tags.map(element => {
              return (
                <Typography
                  gutterBottom
                  component="span"
                  className={classes.spanTags}
                >
                  {element.title}
                </Typography>
              );
            })}
            <Typography
              gutterBottom
              component="span"
              className={classes.spanTags}
            />
            <Typography component="p">{description}</Typography>
            {!share_location && (
              <Button
                variant="outlined"
                className={classes.button}
                onClick={() => this.button_pressed_toggle()}
                id={1}
              >
                BORROW
              </Button>
            )}

            {this.state.button_pressed && (
              <Redirect
                to={{
                  path: "/profile",
                  viewer: {
                    id: item_owner.id,
                    email: item_owner.email,
                    fullname: item_owner.fullname,
                    bio: null
                  }
                }}
              />
            )}
          </CardContent>

          <CardActions />
        </Card>
      </div>
    );
  }
}

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemCard);
