import React, { Fragment } from "react";
import { component } from "react";
import { Redirect, Route, Switch } from "react-router";
import Items from "../pages/Items";
import Home from "../pages/Home";
import Share from "../pages/Share";
import Profile from "../pages/Profile";
import Menu from "../components/navbar/navbar";
import { ViewerContext } from "../context/ViewerProvider";

export default () => (
  <ViewerContext.Consumer>
    {({ viewer, loading }) => {
      if (loading) return null;
      if (!viewer) {
        return (
          <Switch>
            <Route exact path="/welcome" component={Home} />
            <Redirect from="*" to="/welcome" />
          </Switch>
        );
      } else {
        return (
          <Fragment>
            <Menu />
            <Switch>
              <Route path="/items" render={() => <Items />} />
              <Route path="/share" render={() => <Share viewer={viewer} />} />
              <Route
                path="/profile"
                render={() => <Profile viewer={viewer} />}
              />
              <Route
                path="/profile/:id"
                render={() => (component = { Profile })}
              />
              <Redirect from="*" to="/items" />
            </Switch>
          </Fragment>
        );
      }
    }}
  </ViewerContext.Consumer>
);
