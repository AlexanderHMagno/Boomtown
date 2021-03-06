import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { Form, Field } from "react-final-form";
import {
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
  VIEWER_QUERY
} from "../../apollo/queries";
import { graphql, compose } from "react-apollo";
import {
  required,
  required_password,
  required_name
} from "./helpers/validation";
import styles from "./styles";

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formToggle: true,
      problem: false
    };
  }

  render() {
    const { classes, loginMutation, signupMutation } = this.props;
    return (
      <Form
        onSubmit={values => {
          const user = { variables: { user: values } };
          if (this.state.formToggle) {
            loginMutation(user).catch(error =>
              this.setState({ error, problem: "Wrong Password or User" })
            );
          } else {
            signupMutation(user).catch(error =>
              this.setState({
                error,
                problem: "Please verify your information"
              })
            );
          }
        }}
        render={({
          handleSubmit,
          submitting,
          pristine,
          invalid,
          values,
          form
        }) => (
          <form onSubmit={handleSubmit} className={classes.accountForm}>
            {!this.state.formToggle && (
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="fullname">Username</InputLabel>
                <Field
                  name="fullname"
                  validate={required_name}
                  render={({ input, meta }) => (
                    <div className={classes.divContainer}>
                      <Input
                        id="fullname"
                        type="text"
                        style={{ width: "100%" }}
                        inputProps={{
                          ...input,
                          autoComplete: "off"
                        }}
                        value={input.value}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                />
              </FormControl>
            )}
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Field
                name="email"
                className={classes.formControl}
                validate={required}
                render={({ input, meta }) => (
                  <div className={classes.divContainer}>
                    <Input
                      id="email"
                      style={{ width: "100%" }}
                      type="text"
                      inputProps={{
                        ...input,
                        autoComplete: "off"
                      }}
                      value={input.value}
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              />
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Field
                name="password"
                validate={required_password}
                render={({ input, meta }) => (
                  <div className={classes.divContainer}>
                    <Input
                      id="password"
                      style={{ width: "100%" }}
                      type="password"
                      inputProps={{
                        ...input,
                        autoComplete: "off"
                      }}
                      value={input.value}
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              />
            </FormControl>

            {this.state.problem}
            <FormControl className={classes.formControl}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Button
                  type="submit"
                  className={classes.formButton}
                  variant="contained"
                  size="large"
                  color="secondary"
                  disabled={pristine || invalid}
                >
                  {this.state.formToggle ? "Enter" : "Create Account"}
                </Button>
                <Typography>
                  <button
                    className={classes.formToggle}
                    type="button"
                    onClick={() => {
                      form.reset();
                      this.setState({
                        formToggle: !this.state.formToggle
                      });
                    }}
                  >
                    {this.state.formToggle
                      ? "Create an account."
                      : "Login to existing account."}
                  </button>
                </Typography>
              </Grid>
            </FormControl>
            <Typography className={classes.errorMessage} />
          </form>
        )}
      />
    );
  }
}

const refetchQueries = [
  {
    query: VIEWER_QUERY
  }
];

export default compose(
  graphql(SIGNUP_MUTATION, {
    options: {
      refetchQueries
    },
    name: "signupMutation"
  }),
  graphql(LOGIN_MUTATION, {
    options: {
      refetchQueries
    },
    name: "loginMutation"
  }),
  withStyles(styles)
)(AccountForm);
