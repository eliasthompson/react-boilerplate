import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import ExampleComponent from './controls/ExampleComponent';
import ErrorPage from './pages/ErrorPage';

/**
 * A component to handle all routes in the application.
 * @extends {React.Component}
 */
export class Routes extends Component {
  /**
   * This method renders the component.
   * @return {React.Component} returns React element
   */
  render() {
    return (
      <Switch>
        <Redirect exact from="/" to={ `/${this.props.lang}` } />

        <Route exact path="/:lang" component={ ExampleComponent } />

        <Route exact path="*" render={ () => <ErrorPage error="notFound" /> } />
      </Switch>
    );
  }
}

/**
 * This function maps portions of the Redux state to the Routes component's props.
 * @param {Object} state - Redux state
 * @return {Object} returns new Redux state
 * @property {string} lang language code
 */
export const mapStateToProps = state => ({
  lang: state.config.lang,
});

export default withRouter(connect(
  mapStateToProps,
  null,
)(Routes));
