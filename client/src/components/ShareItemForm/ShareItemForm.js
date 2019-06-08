import React, { Component } from "react";
import { connect } from "react-redux";
import { updateNewItem } from "../../redux/reducers";
import { Form, FormSpy, Field } from "react-final-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import Tags from "./tags";
import Share_Preview from "../ShareItemPreview";
import { ADD_ITEM_MUTATION } from "../../apollo/queries";

const onSubmit = async values => {
  window.alert(JSON.stringify(values, 0, 2));
};

class shareItemForm extends Component {
  constructor(props) {
    super(props);
    this.fileRef = React.createRef();
    this.state = {
      image_url: null,
      name: "",
      description: "",
      tags: "",
      formCompleted: false,
      image_button: false
    };
  }

  fileSelectedHandler = event => {
    const file = event.target.files[0];
    if (file) {
      this.getBase64Url(file).then(image_url => {
        this.setState({
          image_url: image_url
        });
      });
    }
  };

  getBase64Url(fileSelected) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => {
        resolve(`data:${fileSelected.type};base64, ${btoa(e.target.result)}`);
      };
      reader.readAsBinaryString(fileSelected);
    });
  }

  dispatchUpdate(values, updateNewItem) {
    this.props.updateNewItem({
      ...values,
      tags: this.state.tags,
      image_url: this.state.image_url
    });
  }

  handleChange = name => event => {
    console.log(name);
    this.setState({
      [name]: event.target.value
    });
  };

  update_tags(new_tags) {
    const string_tags = new_tags.join(", ") + ".";
    string_tags == "."
      ? this.setState({ tags: "" })
      : this.setState({ tags: string_tags });
  }

  update_image(set_image) {
    this.setState({ image_url: null });
  }
  evaluate_button() {
    return (
      this.state.name == "" ||
      this.state.description == "" ||
      this.state.tags == ""
    );
  }

  render() {
    const { classes, viewer } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.leftContainer}>
          <Share_Preview viewer={viewer} />
        </div>
        <div className={classes.rightContainer}>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, submitting, pristine, values }) => (
              <form
                onSubmit={() => {
                  console.log(handleSubmit);
                }}
              >
                <FormSpy
                  subscription={{ values: true }}
                  component={args => {
                    if (values) {
                      this.dispatchUpdate(values, updateNewItem);
                    }
                    return "";
                  }}
                />
                <h1 className={classes.title}>
                  Share. Borrow.<br /> Prosper.
                </h1>
                {!this.state.image_url ? (
                  <div>
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      className={classes.button_large}
                      type="file"
                      onClick={() => console.log()}
                    >
                      SELECT AN IMAGE
                      <input
                        type="file"
                        onChange={this.fileSelectedHandler}
                        ref={this.fileRef}
                        className={classes.picker}
                      />
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="contained"
                    size="large"
                    component="span"
                    className={classes.button_large_off}
                    onClick={() => this.update_image()}
                  >
                    RESET IMAGE
                  </Button>
                )}
                <br />
                <Field name="name">
                  {({ input, meta }) => (
                    <TextField
                      id="name"
                      ref="name"
                      label="Name Your Item"
                      className={classes.textField}
                      value={input.value}
                      margin="normal"
                      inputProps={{
                        ...input
                      }}
                    />
                  )}
                </Field>
                <br />
                <Field name="description">
                  {({ input, meta }) => (
                    <TextField
                      id="multiline-static"
                      placeholder="Describe Your Item"
                      multiline
                      rows="4"
                      defaultValue={input.value}
                      className={classes.textField}
                      margin="normal"
                      inputProps={{
                        ...input
                      }}
                    />
                  )}
                </Field>

                <Field name="tags">
                  {({ input, meta }) => (
                    <Tags
                      width_large={classes.field_large}
                      update_tags={this.update_tags.bind(this)}
                    />
                  )}
                </Field>

                <br />

                {values.name &&
                  values.description &&
                  this.state.tags &&
                  this.state.image_url && (
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button_small}
                    >
                      SHARE
                    </Button>
                  )}

                {!(
                  values.name &&
                  values.description &&
                  this.state.tags &&
                  this.state.image_url
                ) && (
                  <Button
                    variant="contained"
                    color="primary"
                    disabled
                    className={classes.button_small}
                  >
                    SHARE
                  </Button>
                )}
              </form>
            )}
          />
        </div>
      </div>
    );
  }
}
//this will send the state the data to redux
// const mapStateToProps = (reduxState) => {
//   return reduxState
// };
const mapStateToProps = null;
const mapDispatchToProps = dispatch => ({
  /*  This function will provide a prop called 
  'updateNewItem' to our component. */

  updateNewItem(item) {
    // Inside this function we can dispatch data to our reducer.
    dispatch(updateNewItem(item));
  }

  // ... other methods
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(shareItemForm));
