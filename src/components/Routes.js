import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import _ from 'lodash';

import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import ErrorPage from './pages/ErrorPage';
import languages from '../fixtures/languages.json';

/**
 * A component to handle all routes in the application.
 * @param {Object} props - Component props
 * @return {React.Component} returns React element
 */
export function Routes(props) {
  let langPath = '';

  _.forEach(languages, (v, k) => { langPath += `|${k}`; });

  return (
    <Switch>
      <Redirect exact from="/" to={ `/${props.lang}` } />
      <Route exact path={`/:lang(${langPath.slice(1)})`} component={ HomePage } />
      <Route exact path={`/:lang(${langPath.slice(1)})/settings`} component={ SettingsPage } />
      <Route render={ () => <ErrorPage error="notFound" /> } />
    </Switch>
  );
}

/**
 * This function maps portions of the Redux state to the Routes component's props.
 * @param {Object} state - Redux state
 * @return {Object} returns new Redux state
 * @property {string} lang language code
 */
export const mapStateToProps = state => ({
  lang: state.userData.settings.lang,
});

export default withRouter(connect(
  mapStateToProps,
  null,
)(Routes));
