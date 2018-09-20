import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import languages from '../../fixtures/languages.json';

/**
 * A user button control component that allows login, logout, and user options.
 * @extends {React.Component}
 */
export class UserButton extends Component {
  /**
  * The constructor sets the default state and assigns the this context to custom methods.
  * @param {Object} props - Component props
  */
  constructor(props) {
    super(props);

    /* istanbul ignore next */
    this.state = {
      open: false,
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin() {

  }

  handleLogout() {

  }

  /**
   * This method renders the component.
   * @return {React.Component} returns a React element
   */
  render() {
    const user = jwt.decode(window.localStorage.jwtToken) || {};
    const menuItems = [
      <Link key="settings" to={ `/${this.props.lang}/settings` }>
        <li>
          <FontAwesomeIcon icon={ faCog } />
          { languages[this.props.lang].settings }
        </li>
      </Link>,
      <li key="logout" onClick={ this.handleLogout }>
        <FontAwesomeIcon icon={ faSignOutAlt } />
        { languages[this.props.lang].logout }
      </li>,
    ];
    let buttonClass = (this.state.open) ? 'open' : '';
    let handleButtonClick = this.handleLogin;
    let buttonContent = [
      <FontAwesomeIcon icon={ faSignInAlt } />,
      languages[this.props.lang].login,
    ];

    if (languages[this.props.lang].rtl) buttonClass += ' rtl';
    if (user.name && user.email) {
      handleButtonClick = () => {
        this.setState({ open: !this.state.open });
      };
      buttonContent = [
        <img key="gravatar" src={ gravatar.url(user.email, { size: 48, default: 'mp' }) } />,
        <span key="name">{ user.name }</span>,
      ];
    }

    return (
      <div className={ buttonClass }>
        <button onClick={ handleButtonClick }>
          { buttonContent }
        </button>

        <ul>
          { menuItems }
        </ul>

        <style jsx>{`
          div {
            position: relative;

            button {
              display: flex;
              align-items: center;
              align-content: center;
              height: 32px;
              background-color: rgba(0, 0, 0, 0.2);
              transition: background-color 0.2s ease;

              :global(svg) {
                margin: 0 8px 0 0;
              }

              :global(img) {
                width: 24px;
                height: 24px;
                margin: 0 8px 0 -4px;
                border-radius: 4px;
              }

              &:hover {
                background-color: rgba(0, 0, 0, 0.3);
              }
            }

            ul {
              position: absolute;
              top: 42px;
              right: 0;
              z-index: 5;
              display: flex;
              flex-direction: column;
              overflow-y: hidden;
              min-width: 100%;
              height: 0px;
              border-radius: 4px;
              background-color: #424242;
              transition: height 0.2s ease;

              :global(li) {
                position: relative;
                display: flex;
                align-items: center;
                align-content: center;
                box-sizing: border-box;
                min-height: 32px;
                padding: 4px 8px;
                cursor: pointer;

                :global(svg) {
                  margin: 0 8px 0 0;
                }

                &:not(:first-child) {
                  margin-top: 1px;

                  &::before {
                    position: absolute;
                    left: 8px;
                    right: 8px;
                    top: -1px;
                    border-top: 1px solid rgba(255, 255, 255, 0.2);
                    content: '';
                  }
                }

                &:hover {
                  background-color: rgba(0, 0, 0, 0.1);
                }
              }
            }

            &.rtl {
              button {
                flex-direction: row-reverse;
                text-align: right;

                :global(svg) {
                  margin: 0 0 0 8px;
                }

                :global(img) {
                  margin: 0 -4px 0 8px;
                }
              }

              ul {
                :global(li) {
                  flex-direction: row-reverse;
                  text-align: right;

                  :global(svg) {
                    margin: 0 0 0 8px;
                  }
                }
              }
            }

            &.open {
              button {
                background-color: rgba(0, 0, 0, 0.3);
              }

              ul {
                height: ${((menuItems.length * 32) + (menuItems.length - 1))}px;
              }
            }
          }
        `}</style>
      </div>
    );
  }
}

/**
 * This function maps portions of the Redux state to the UserButton component's props.
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
)(UserButton);
