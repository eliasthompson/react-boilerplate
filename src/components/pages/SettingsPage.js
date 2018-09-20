import React, { Component } from 'react';
import { connect } from 'react-redux';

import LanguageToggle from '../controls/LanguageToggle';
// import languages from '../../fixtures/languages.json';
import { updateConfig } from '../../actions/config';

/**
 * A settings page component.
 * @extends {React.Component}
 */
export class SettingsPage extends Component {
  /**
  * The constructor updates the Config Redux slice with the current language from the router.
  * @param {Object} props - Component props
  */
  constructor(props) {
    super(props);

    /* istanbul ignore next */
    if (props.match.params.lang !== props.lang) props.updateConfig({ lang: props.match.params.lang });
  }

  /**
   * This method renders the component.
   * @return {React.Component} returns React element
   */
  render() {
    return (
      <section>
        <LanguageToggle />

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
  * This corrects the URL if there is a mismatch with the Redux state after an update.
  * @param {Object} prevProps - Previous props
  */
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.lang !== this.props.lang) this.props.history.replace(`/${this.props.lang}/settings`);
  }
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
  { updateConfig },
)(SettingsPage);
