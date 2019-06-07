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

class ItemCard extends React.Component {
  state = {
    location: ""
  };
  componentDidMount() {
    this.setState({
      location: window.location.pathname
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
                  email={item_owner + "@red.com/d=retro"}
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
                  {item_owner}
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
                onClick={() => "a"}
                id={1}
              >
                BORROW
              </Button>
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