import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import languages from '../../fixtures/languages.json';
import { updateConfig } from '../../actions/config';

/**
 * An example component control component to showcase Redux and Styled JSX.
 * @extends {React.Component}
 */
export class ExampleComponent extends Component {
  /** The constructor assigns the this context to custom methods. */
  constructor(props) {
    super(props);

    /* istanbul ignore next */
    this.handleLanguageChange = this.handleLanguageChange.bind(this);

    if (props.match.params.lang !== props.lang) props.updateConfig({ lang: props.match.params.lang });
  }

  /** This corrects the URL if there is a mismatch with the Redux state after an update. */
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.lang !== this.props.lang) this.props.history.replace(`/${this.props.lang}`);
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
      <div className="example-component">
        <span onClick={ this.handleLanguageChange }>{ languages[this.props.lang].hello }</span>

        <style jsx>{`
          .example-component {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            align-content: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            text-align: center;

            span {
              width: 100%;
              font-weight: 200;
              cursor: pointer;
              user-select: none;
              transform: scale(1);
              transition: transform 0.5s ease;

              &:hover {
                transform: scale(1.1);
              }
            }

            &::after {
              position: absolute;
              bottom: 20px;
              opacity: 0.5;
              font-weight: 400;
              font-size: 10px;
              content: '${languages[this.props.lang].langCode} ${this.props.lang}';
            }
          }
        `}</style>
      </div>
    );
  }
}

/**
 * This function maps portions of the Redux state to the ExampleComponent component's props.
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
)(ExampleComponent);
