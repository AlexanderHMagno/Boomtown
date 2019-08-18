import React from "react";
import Items from "./Items";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { Query } from "react-apollo";
import { ALL_ITEMS_QUERY } from "../../apollo/queries";

const ItemsContainer = ({ viewer, classes }) => (
  <Query query={ALL_ITEMS_QUERY} variables={{ filter: viewer.id }}>
    {({ loading, error, data }) => {
      //if (loading) return <FullScreenLoader inverted />;
      if (loading) return <p>Loading...</p>;
      if (error) return <p>{`Error! ${error.message}`}</p>;
      return <Items classes={classes} items={data.items} />;
    }}
  </Query>
);

export default withStyles(styles)(ItemsContainer);
