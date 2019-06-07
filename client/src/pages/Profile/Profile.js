import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Gravatar from "react-gravatar";
import { FormHelperText } from "@material-ui/core";
import { ALL_USER_ITEMS_QUERY } from "../../apollo/queries";
import { Query } from "react-apollo";
import Card from "../Items/Card";
import Items from "../Items/Items";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    minHeight: 250,
    width: "90%",
    margin: "auto",
    marginTop: "50px"
  }),
  title_Container: {
    display: "flex",
    alignItems: "center"
  },
  userName: {
    fontSize: "50px",
    display: "inline",
    textTransform: "Capitalize",
    marginLeft: "15px"
  },
  gravatar: {
    borderRadius: "50%"
  }
});

function Profile(props) {
  const { classes, viewer } = props;
  return (
    <div>
      <Query query={ALL_USER_ITEMS_QUERY} variables={{ id: viewer.id }}>
        {({ loading, error, data }) => {
          {
            /* How to pass variables in a query */
          }
          console.log(data);
          //if (loading) return <FullScreenLoader inverted />;
          if (loading) return <p>Loading...</p>;
          if (error) return <p>{`Error! ${error.message}`}</p>;

          let user = data.user.items !== undefined ? data.user.items : "";
          console.log(user.length);
          return (
            <div>
              <Paper className={classes.root} elevation={4}>
                <div className={classes.title_Container}>
                  <Gravatar
                    email={viewer.email + "/d=retro"}
                    className={classes.gravatar}
                  />
                  <Typography
                    variant="headline"
                    component="h3"
                    className={classes.userName}
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
              <Items items={user} />
              {/* // <Card
            //   item_owner={"element.itemowner.fullname"}
            //   title={"alexander"}
            //   description={"element.description"}
            //   imageUrl={null}
            //   tags={[{ id: "30", title: "black", __typename: "Tag" }]}
            //   item_id={1}
            // /> */}
            </div>
          );
        }}
      </Query>
    </div>
  );
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
