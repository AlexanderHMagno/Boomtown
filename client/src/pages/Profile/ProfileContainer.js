import React, { Component } from "react";
import Profile from "./Profile";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
// import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from "react-apollo";
import { ITEM_QUERY } from "../../apollo/queries";
import Items from "../Items/Items";
import { test2 } from "../Items/Card";

class ProfileContainer extends Component {
  render() {
    const { classes, viewer } = this.props;

    return (
      <div className={classes.back}>
        <Profile viewer={viewer} />
      </div>

      // <Query query={ITEM_QUERY(4)}>
      //   {({ loading, error, data }) => {
      //     //if (loading) return <FullScreenLoader inverted />;
      //     if (loading) return <p>Loading...</p>;
      //     if (error) return <p>{`Error! ${error.message}`}</p>;
      //     return <Items classes={this.props.classes} items={data.items} />;
      //   }}
      // </Query>
    );
  }
}

export default withStyles(styles)(ProfileContainer);
