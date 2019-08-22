import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Gravatar from "react-gravatar";
import { ALL_USER_ITEMS_QUERY } from "../../apollo/queries";
import { Query } from "react-apollo";
import Items from "../Items/Items";
import styles from "./styles";
import { ViewerContext } from "../../context/ViewerProvider";

class Profile extends React.Component {
  static contextType = ViewerContext;
  render() {
    const { viewer } = this.context;
    const classes = styles();
    return (
      <div>
        <Query query={ALL_USER_ITEMS_QUERY} variables={{ id: viewer.id }}>
          {({ loading, error, data }) => {
            //if (loading) return <FullScreenLoader inverted />;
            if (loading) return <p>Loading...</p>;
            if (error) return <p>{`Error! ${error.message}`}</p>;

            let user = data.user.items !== undefined ? data.user.items : "";

            return (
              <div>
                <Paper style={classes.root} elevation={4}>
                  <div style={classes.titleContainer}>
                    <Gravatar
                      email={viewer.email + "/d=retro"}
                      style={classes.gravatar}
                    />
                    <Typography
                      variant="headline"
                      component="h3"
                      style={classes.userName}
                    >
                      {viewer.fullname}
                    </Typography>
                  </div>
                  <Typography component="p">
                    {user.length} Items shared 0 Items borrowed
                    <br />
                    {viewer.bio ? viewer.bio : '"No bio provided."'}
                  </Typography>
                </Paper>

                <Typography
                  variant="headline"
                  component="h1"
                  style={classes.sharedTitle}
                >
                  Shared Items
                </Typography>
                <Items items={user} />
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object
};

export default Profile;
