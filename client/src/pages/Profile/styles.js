const styles = theme => ({
  back: {
    background: "black",
    height: "100vh",
    witdh: "100vw",
    paddingTop: "40px"
  },
  root: {
    paddingTop: 16,
    paddingBottom: 16,
    minHeight: 250,
    width: "90%",
    margin: "auto",
    marginTop: "50px"
  },
  titleContainer: {
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
  },
  sharedTitle: {
    color: "#f9a825",
    fontSize: "35px",
    fontWeight: "bold",
    marginLeft: "5%",
    marginTop: "1.5%",
    position: "absolute"
  }
});

export default styles;
