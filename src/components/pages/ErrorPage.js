import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import languages from '../../fixtures/languages.json';

/**
 * An error page component.
 * @param {Object} props - Component props
 * @return {Array<React.Component>} returns an array of React elements
 */
export function ErrorPage(props) {
  return [
    <Helmet key="helmet"><title>{ languages[props.lang][props.error] }</title></Helmet>,
    <h1 key="h1">{ languages[props.lang][props.error] }</h1>,
  ];
}

/**
 * This function maps portions of the Redux state to the SettingsPage component's props.
 * @param {Object} state - Redux state
 * @return {Object} returns new Redux state
 * @property {string} lang language code
 */
export const mapStateToProps = state => ({
  lang: state.userData.settings.lang,
});

export default connect(
  mapStateToProps,
  null,
)(ErrorPage);

ErrorPage.propTypes = {
  error: PropTypes.string,
};
