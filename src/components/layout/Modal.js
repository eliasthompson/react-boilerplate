import React, { Component } from 'react';
import { connect } from 'react-redux';

import languages from '../../fixtures/languages.json';
import { hideModal } from '../../actions/ui';

/**
 * A modal layout component that sets document language based on Redux state.
 * @return {React.Component} returns a React element
 */
export class Modal extends Component {
  constructor() {
    super();

    /* istanbul ignore next */
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside(e) {
    if (this.modalRef && !this.modalRef.contains(e.target)) {
      if (this.props.visible) this.props.hideModal();
    }
  }

  render() {
    let classNameShield = 'shield';
    let classNameModal = 'modal';

    if (this.props.visible) classNameShield += ' visible';
    if (languages[this.props.lang].rtl) classNameModal += ' rtl';

    return (
      <div className={ classNameShield }>
        <div className={ classNameModal } ref={ (node) => { this.modalRef = node; } }>
          { this.props.content }
        </div>

        <style jsx>{`
          .shield {
            position: absolute;
            z-index: -100;
            display: flex;
            align-items: center;
            align-content: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            opacity: 0;
            background-color: rgba(0, 0, 0, 0.8);
            text-align: center;
            transition: opacity 0.2s ease 0s, z-index 0s ease 0.2s;

            &.visible {
              z-index: 100;
              opacity: 1;
              transition: opacity 0.2s ease 0s;
            }

            .modal {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              align-content: flex-start;
              border-radius: 4px;
              padding: 20px;
              background-color: #424242;
              box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

              &.rtl {
                align-items: flex-end;
                align-content: flex-end;
              }
            }
          }
        `}</style>
      </div>
    );
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside, false);
  }

  componentWillMount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }
}

/**
 * This function maps portions of the Redux state to the Modal component's props.
 * @param {Object} state - Redux state
 * @return {Object} returns new Redux state
 * @property {string} lang language code
 */
export const mapStateToProps = state => ({
  content: state.ui.modalContent,
  visible: state.ui.modalVisible,
  lang: state.userData.settings.lang,
});

export default connect(
  mapStateToProps,
  { hideModal },
)(Modal);
