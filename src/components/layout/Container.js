import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import Header from './Header';
import Routes from '../Routes';
import config from '../../../config.json';

/**
 * A container layout component that sets document language based on Redux state.
 * @param {Object} props - Component props
 * @return {Array<React.Component>} returns array of React elements
 */
export function Container(props) {
  return [
    <Helmet key="helmet" titleTemplate={ `%s | ${config.name}` } defaultTitle={ config.name }>
      <html lang={ props.lang } />
    </Helmet>,

    <Header key="header" />,

    <div key="container" className="container">
      <Routes />

      <style jsx global>{`
        @font-face {
          font-family: 'Roboto';
          font-weight: 200;
          src: url('public/fonts/Roboto-Light.ttf') format('truetype');
        }

        @font-face {
          font-family: 'Roboto';
          font-weight: 400;
          src: url('public/fonts/Roboto-Regular.ttf') format('truetype');
        }

        @font-face {
          font-family: 'Roboto';
          font-weight: 600;
          src: url('public/fonts/Roboto-Medium.ttf') format('truetype');
        }

        * {
          margin: 0px;
          outline: 0px;
          border: 0px;
          padding: 0px;
        }

        html,
        body,
        #root {
          height: 100%;
          overflow: hidden;
        }

        body,
        #root {
          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        body {
          background-color: ${config.themeColor};
          font-family: 'Roboto', sans-serif;
          color: #FFFFFF;
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        button {
          display: flex;
          border-radius: 4px;
          padding: 4px 8px;
          background-color: transparent;
          font: inherit;
          color: #FFFFFF;
          cursor: pointer;
        }
      `}</style>

      <style jsx>{`
        .container {
          flex: 1;
          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;
          background-color: #303030;
        }
      `}</style>
    </div>,
  ];
}

/**
 * This function maps portions of the Redux state to the Container component's props.
 * @param {Object} state - Redux state
 * @return {Object} returns new Redux state
 * @property {string} lang language code
 */
export const mapStateToProps = state => ({
  lang: state.config.lang,
});

export default withRouter(connect(
  mapStateToProps,
  null,
)(Container));
