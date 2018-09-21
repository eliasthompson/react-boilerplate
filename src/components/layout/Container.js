import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import Modal from './Modal';
import Header from './Header';
import Routes from '../Routes';
import languages from '../../fixtures/languages.json';
import config from '../../../config.json';

/**
 * A container layout component that sets document language based on Redux state.
 * @param {Object} props - Component props
 * @return {Array<React.Component>} returns array of React elements
 */
export function Container(props) {
  let className = 'container';
  if (languages[props.lang].rtl) className += ' rtl';

  return [
    <Helmet key="helmet" titleTemplate={ `%s | ${config.name}` } defaultTitle={ config.name }>
      <html lang={ props.lang } />
    </Helmet>,

    <Header key="header" />,
    <Modal key="modal" />,

    <div key="container" className={ className }>
      <Routes />
      <span>{ languages[props.lang].langCode } { props.lang }</span>

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
          position: relative;
          display: flex;
          border-radius: 4px;
          padding: 4px 8px;
          background-color: transparent;
          font: inherit;
          color: #FFFFFF;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
          transition: background-color 0.2s ease, box-shadow 0.2s ease;

          &:hover,
          &:focus {
            box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
          }
        }

        input {
          border-radius: 4px;
          padding: 4px 8px;
          background-color: rgba(0, 0, 0, 0.3);
          font: inherit;
          color: #FFFFFF;
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.12), inset 0 1px 2px rgba(0,0,0,0.24);

          &:focus {
            box-shadow: inset 0 3px 6px rgba(0,0,0,0.16), inset 0 3px 6px rgba(0,0,0,0.23);
          }
        }
      `}</style>

      <style jsx>{`
        .container {
          flex: 1;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          align-content: flex-start;
          width: calc(100% - 40px);
          padding: 20px;
          background-color: #303030;

          &.rtl {
            align-items: flex-end;
            align-content: flex-end;
          }

          span {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 20px;
            opacity: 0.5;
            text-align: center;
            font-weight: 400;
            font-size: 10px;
          }
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
  lang: state.userData.settings.lang,
});

export default withRouter(connect(
  mapStateToProps,
  null,
)(Container));
