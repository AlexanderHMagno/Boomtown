import React from "react";
import Card from "./Card";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";
import { itemsStyles } from "./styles.js";

let Items = ({ items }) => (
  <div style={itemsStyles.root}>
    <Grid container spacing={40} style={itemsStyles.gridContainer}>
      {items.map(item => (
        <Grid key={item.id} item xs={12} sm={6} md={4}>
          <Grow>
            <Card element={item} />
          </Grow>
        </Grid>
      ))}
    </Grid>
  </div>
);

export default Items;
