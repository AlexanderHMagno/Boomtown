const input_large_field = "70%";
const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "90%",
    margin: "auto"
  },
  leftContainer: {
    marginLeft: theme.spacing.unit,
    width: "35%"
  },
  rightContainer: {
    marginLeft: theme.spacing.unit,
    width: "48%"
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: input_large_field
  },
  menu: {
    width: 200
  },
  button_small: {
    marginLeft: theme.spacing.unit
  },
  button_large: {
    marginLeft: theme.spacing.unit,
    width: input_large_field,
    backgroundColor: "#f9a825 !important",
    color: "black !important"
  },
  button_large_off: {
    marginLeft: theme.spacing.unit,
    width: input_large_field,
    color: "grey"
  },

  title: {
    fontSize: "3rem",
    marginLeft: theme.spacing.unit
  },
  field_large: {
    width: input_large_field,
    marginLeft: theme.spacing.unit
  },
  picker: {
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0,
    cursor: "pointer"
  }
});

export default styles;
