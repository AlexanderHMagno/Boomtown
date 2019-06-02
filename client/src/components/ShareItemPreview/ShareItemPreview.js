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
import Avatar from "@material-ui/core/Avatar";
import styles from "./styles";

function SharePreview(props) {
  const { classes, title, description, imageUrl, tags, value } = props;
  console.log("preview: ", value.rootReducer);
  const item_image =
    imageUrl === undefined
      ? "http://via.placeholder.com/350x250?text=Please%20select%20an%20image"
      : imageUrl;

  const item_description =
    description === "" ? "Describe Your Item" : description;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={item_image}
          title={description}
        />
        <CardContent>
          <div className={classes.user_info_container}>
            <div>
              <ImageAvatars />
            </div>
            <div className={classes.user_info_right}>
              <Typography
                gutterBottom
                fontSize={12}
                component="span"
                className={classes.user_span}
              >
                this user...
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
            {value.rootReducer.name}
          </Typography>
          <Typography component="p" className={classes.tags_Typo}>
            {value.rootReducer.tags}
          </Typography>
          <Typography component="p">{value.rootReducer.description}</Typography>
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

function ImageAvatars(props) {
  const { classes } = props;
  return (
    <div>
      <Avatar
        alt="Logo"
        src="https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_1280.png"
      />
    </div>
  );
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  value: state
});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(SharePreview));
