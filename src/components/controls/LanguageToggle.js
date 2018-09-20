import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import languages from '../../fixtures/languages.json';
import { updateConfig } from '../../actions/config';

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

  /** This method handles changing the language in the Config Redux slice. */
  handleLanguageChange() {
    const langs = _.keys(languages);
    let newLangIndex = (_.indexOf(langs, this.props.lang) + 1);

    if (newLangIndex === langs.length) newLangIndex = 0;

    this.props.updateConfig({ lang: langs[newLangIndex] });
  }

  /**
   * This method renders the component.
   * @return {React.Component} returns React element
   */
  render() {
    return (
      <button onClick={ this.handleLanguageChange }>
        { languages[this.props.lang].languageName }

        <style jsx>{`
          button {
            position: relative;
            display: flex;
            align-items: center;
            align-content: center;
            height: 32px;
            background-color: #424242;
            transition: background-color 0.2s ease;

            &::before {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border-radius: 4px;
              content: '';
            }

            &:hover {
              &::before {
                background-color: rgba(0, 0, 0, 0.1);
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
  lang: state.config.lang,
});

export default connect(
  mapStateToProps,
  { updateConfig },
)(LanguageToggle);
