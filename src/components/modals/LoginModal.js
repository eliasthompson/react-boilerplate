import React, { Component } from 'react';
import Color from 'color';
import { connect } from 'react-redux';

import languages from '../../fixtures/languages.json';
import config from '../../../config.json';
import { hideModal } from '../../actions/ui';
import { loginUser } from '../../actions/user';

const themeColor = new Color(config.themeColor);

/**
 * An error page component.
 * @param {Object} props - Component props
 * @return {Array<React.Component>} returns an array of React elements
 */
export class LoginModal extends Component {
  constructor() {
    super();

    /* istanbul ignore next */
    this.state = {
      username: '',
      password: '',
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.hideModal();
  }

  handleLogin(e) {
    e.preventDefault();
    this.props.loginUser({ username: this.state.username, password: this.state.password });
  }

  render() {
    let className = '';
    if (languages[this.props.lang].rtl) className = 'rtl';

    return [
      <h2 key="h2">{ languages[this.props.lang].login }</h2>,

      <form key="form" className={ className } onSubmit={ this.handleLogin }>
        <div>
          <input
            value={ this.state.username }
            placeholder={ languages[this.props.lang].username }
            onChange={ (e) => { this.setState({ username: e.target.value }); } }
          />
          <input
            type="password"
            value={ this.state.password }
            placeholder={ languages[this.props.lang].password }
            onChange={ (e) => { this.setState({ password: e.target.value }); } }
          />
        </div>

        <div className="buttons">
          <button className="flat" type="button" onClick={ this.handleCancel }>{ languages[this.props.lang].cancel }</button>
          <button className="action" type="submit">{ languages[this.props.lang].login }</button>
        </div>

        <style jsx>{`
          form {
            display: flex;
            flex-direction: column;

            div {
              display: flex;
              margin-top: 16px;

              input {
                box-sizing: border-box;
                height: 32px;
                margin: 0 8px;

                &:first-child {
                  margin-left: 0;
                }

                &:last-child {
                  margin-right: 0;
                }
              }

              button {
                height: 32px;

                &.flat {
                  box-shadow: none;
                  font-weight: 600;
                }

                &.action {
                  background-color: ${config.themeColor};

                  &:active {
                    background-color: ${themeColor.darken(0.1)};
                  }
                }
              }

              &.buttons {
                justify-content: flex-end;
                text-align: right;
              }
            }

            &.rtl {
              justify-content: flex-end;
              text-align: right;

              div {
                flex-direction: row-reverse;

                input {
                  direction: rtl;

                  &:first-child {
                    margin: 0 0 0 8px;
                  }

                  &:last-child {
                    margin: 0 8px 0 0;
                  }
                }
              }
            }
          }
        `}</style>
      </form>,
    ];
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
  { loginUser, hideModal },
)(LoginModal);
