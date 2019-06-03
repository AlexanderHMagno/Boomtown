//this is a test the real data is in shareItemForm1.

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

const onSubmit = async values => {
  window.alert(JSON.stringify(values, 0, 2));
};
class shareItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      tags: "",
      formCompleted: false,
      image_button: false
    };
  }

  dispatchUpdate(values, updateNewItem) {
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateNewItem({
          imageurl
        });
      });
    }
    this.props.updateNewItem({
      ...values,
      tags: this.state.tags
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
    this.setState({ image_button: !set_image });
  }
  evaluate_button() {
    return (
      this.state.name == "" ||
      this.state.description == "" ||
      this.state.tags == ""
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.leftContainer}>
          <Share_Preview />
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
                {!this.state.image_button ? (
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    className={classes.button_large}
                    onClick={() => this.update_image(this.state.image_button)}
                  >
                    SELECT AN IMAGE
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="large"
                    component="span"
                    className={classes.button_large_off}
                    onClick={() => this.update_image(this.state.image_button)}
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
                      // label="Describe Your Item"
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
                  this.state.tags && (
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button_small}
                    >
                      SHARE
                    </Button>
                  )}

                {!(values.name && values.description && this.state.tags) && (
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
