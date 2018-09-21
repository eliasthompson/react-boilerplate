import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import LanguageToggle from '../controls/LanguageToggle';
import languages from '../../fixtures/languages.json';
import { updateUserData } from '../../actions/userData';

/**
 * A settings page component.
 * @extends {React.Component}
 */
export class SettingsPage extends Component {
  /**
  * The constructor updates the User Settings Redux slice with the current language from the router.
  * @param {Object} props - Component props
  */
  constructor(props) {
    super(props);

    /* istanbul ignore next */
    if (props.match.params.lang !== props.lang) props.updateUserData({ settings: { lang: props.match.params.lang } });
  }

  /**
   * This method renders the component.
   * @return {Array<React.Component>} returns an array of React elements
   */
  render() {
    return [
      <Helmet key="helmet"><title>{ languages[this.props.lang].settings }</title></Helmet>,
      <h1 key="h1">{ languages[this.props.lang].settings }</h1>,
      <LanguageToggle key="toggle" />,
    ];
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
  lang: state.userData.settings.lang,
});

export default connect(
  mapStateToProps,
  { updateUserData },
)(SettingsPage);
