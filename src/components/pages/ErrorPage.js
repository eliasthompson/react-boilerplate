import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import languages from '../../fixtures/languages.json';

/**
 * An error page component.
 * @param {Object} props - Component props
 * @return {React.Component} returns React element
 */
export function ErrorPage(props) {
  return (
    <section>
      { languages[props.lang][props.error] }

      <style jsx>{`
        section {
          flex: 1;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          align-content: center;
          justify-content: center;
          width: 100%;
          text-align: center;
        }
      `}</style>
    </section>
  );
}

/**
 * This function maps portions of the Redux state to the SettingsPage component's props.
 * @param {Object} state - Redux state
 * @return {Object} returns new Redux state
 * @property {string} lang language code
 */
export const mapStateToProps = state => ({
  lang: state.config.lang,
});

export default connect(
  mapStateToProps,
  null,
)(ErrorPage);

ErrorPage.propTypes = {
  error: PropTypes.string,
};
