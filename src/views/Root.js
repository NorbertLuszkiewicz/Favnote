import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import Notes from 'views/Notes';
import Articles from 'views/Articles';
import Twitters from 'views/Twitters';
import UserPageTemplate from 'templates/UserPageTemplate';
import DetailsPage from 'views/DetailsPage';
import { routes } from 'routes';
import LoginPage from 'views/LoginPage';
import RegisterPage from 'views/RegisterPage';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <UserPageTemplate>
        <Switch>
          <Route exact path={routes.login} component={LoginPage} />
          <Route exact path={routes.register} component={RegisterPage} />
          <Route exact path={routes.home} render={() => <Redirect to="/login" />} />
          <Route exact path={routes.notes} component={Notes} />
          <Route exact path={routes.note} component={DetailsPage} />
          <Route exact path={routes.articles} component={Articles} />
          <Route exact path={routes.article} component={DetailsPage} />
          <Route exact path={routes.twitters} component={Twitters} />
          <Route exact path={routes.twitter} component={DetailsPage} />
        </Switch>
      </UserPageTemplate>
    </BrowserRouter>
  </Provider>
);

export default Root;
