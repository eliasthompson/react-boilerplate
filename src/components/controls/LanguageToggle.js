import React, { Component } from 'react';
import Color from 'color';
import { connect } from 'react-redux';
import _ from 'lodash';

import languages from '../../fixtures/languages.json';
import config from '../../../config.json';
import { updateUserData } from '../../actions/userData';

const accentColor = new Color(config.accentColor);

/**
 * A language toggle control component to showcase Redux and Styled JSX.
 * @extends {React.Component}
 */
export class LanguageToggle extends Component {
  /** The constructor assigns the this context to custom methods. */
  constructor(props) {
    super(props);

    /* istanbul ignore next */
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  }

  /** This method handles changing the language in the User Data Redux slice. */
  handleLanguageChange() {
    const langs = _.keys(languages);
    let newLangIndex = (_.indexOf(langs, this.props.lang) + 1);

    if (newLangIndex === langs.length) newLangIndex = 0;

    this.props.updateUserData({ settings: { lang: langs[newLangIndex] } });
  }

  /**
   * This method renders the component.
   * @return {React.Component} returns React element
   */
  render() {
    return (
      <button className="action" onClick={ this.handleLanguageChange }>
        { languages[this.props.lang].languageName }

        <style jsx>{`
          button {
            height: 32px;
            margin-top: 8px;

            &.action {
              background-color: ${config.accentColor};

              &:active {
                background-color: ${accentColor.darken(0.1)};
              }
            }
          }
        `}</style>
      </button>
    );
  }
}

/**
 * This function maps portions of the Redux state to the LanguageToggle component's props.
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
)(LanguageToggle);
