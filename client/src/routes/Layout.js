import React, { Fragment } from 'react';
import { component } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Items  from '../pages/Items';
import  Home  from '../pages/Home';
import  Share  from '../pages/Share';
import Profile  from '../pages/Profile';
import Menu from '../components/navbar/navbar';

export default () => (
  <Fragment>
      <Menu />  
      
    <Switch>
    
      <Route path="/items" component={Items} />
      <Route path="/welcome" component={Home} />
      <Route path="/share" component={Share} />
      <Route path="/profile" component={Profile} />
      <Route path="/profile/:id" 
             render= {()=>component={Profile}} />
      <Redirect from="*" to="/items" />
      
      {/**
       * @TODO: Define routes here for: /items, /profile, /profile/:userid, and /share
       *
       * Provide a wildcard redirect to /items for any undefined route using <Redirect />.
       *
       * Later, we'll add logic to send users to one set of routes if they're logged in,
       * or only view the /welcome page if they are not.
       */}
    </Switch>
  </Fragment>
);
