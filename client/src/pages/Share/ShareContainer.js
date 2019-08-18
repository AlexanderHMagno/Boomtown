import React from "react";
import Share from "./Share";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
let ShareContainer = ({ viewer }) => <Share viewer={viewer} />;
export default withStyles(styles)(ShareContainer);
