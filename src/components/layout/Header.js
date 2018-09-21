import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import UserMenu from '../controls/UserMenu';
import config from '../../../config.json';

/**
 * A header layout component that displays the logo and allows someone to login.
 * @param {Object} props - Component props
 * @return {React.Component} returns a React element
 */
export function Header(props) {
  return (
    <header>
      <Link className="logo-link" to={ `/${props.lang}` }><img src="public/images/logo.png" alt="Logo" /></Link>
      <UserMenu />

      <style jsx>{`
        header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
          width: 100%;
          height: 42px;
          padding: 0 10px;
          background-color: ${config.themeColor};
          box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

          :global(.logo-link) {
            height: 100%;

            :global(img) {
              margin-left: -10px;
              height: 100%;
            }
          }
        }
      `}</style>
    </header>
  );
}

/**
 * This function maps portions of the Redux state to the Header component's props.
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
)(Header);
