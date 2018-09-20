import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import UserButton from '../controls/UserButton';
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
      <UserButton />

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

          :global(.logo-link) {
            height: 100%;

            :global(img) {
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
  lang: state.config.lang,
});

export default connect(
  mapStateToProps,
  null,
)(Header);
