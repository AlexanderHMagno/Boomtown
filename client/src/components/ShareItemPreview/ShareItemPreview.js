import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Gravatar from "react-gravatar";
import styles, { placeholder } from "./styles";

function SharePreview(props) {
  const { classes, value, viewer } = props;
  const { image_url, name, tags, description } = value.rootReducer;
  const item_image = image_url === null ? placeholder : image_url;

  return (
    <div>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={item_image} />
        <CardContent>
          <div className={classes.user_info_container}>
            <div>
              <Gravatar
                email={viewer.email + "/d=retro"}
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
                {viewer.fullname}
              </Typography>
              <Typography
                gutterBottom
                fontSize={2}
                component="span"
                className={classes.user_span}
              >
                Hour
              </Typography>
            </div>
          </div>
          <Typography gutterBottom variant="headline" component="h2">
            {name}
          </Typography>
          <Typography component="p" className={classes.tags_Typo}>
            {tags}
          </Typography>
          <Typography component="p">{description}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined" className={classes.button}>
            BORROW
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

SharePreview.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  value: state
});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(SharePreview));
