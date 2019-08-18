export const imageBase =
  "http://via.placeholder.com/350x250?text=Please%20select%20an%20image";

export const itemsStyles = {
  root: {
    background: "black"
  },
  gridContainer: {
    paddingTop: 50,
    width: "90%",
    margin: "auto",
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  }
};

const styles = {
  card: {
    maxHeight: "500px",
    marginTop: 0
  },
  gravatar: {
    borderRadius: "50%"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  user_info_container: {
    display: "flex",
    marginBottom: "50px"
  },
  user_info_right: {
    marginLeft: "10px"
  },
  user_span: {
    margin: "0px"
  },
  spanTags: {
    display: "inline",
    textTransform: "capitalize",
    marginRight: 5,
    color: "grey"
  }
};

export default styles;
