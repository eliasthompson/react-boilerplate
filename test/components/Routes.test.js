import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../../src/store';
import { Routes, mapStateToProps } from '../../src/components/Routes';
import ErrorPage from '../../src/components/pages/ErrorPage';

describe('Component: Routes', function () {
  const sandbox = sinon.createSandbox();
  const defaultProps = {
    lang: 'en',
  };
  let wrapper;

  beforeEach(function () {
    wrapper = shallow(<Routes {...defaultProps} />);
  });

  afterEach(function () {
    wrapper.unmount();
    sandbox.restore();
  });

  describe('render', function () {
    it('renders correctly', function () {
      wrapper.unmount();
      wrapper = mount(<Provider store={ store }>
        <MemoryRouter initialEntries={['/blah/blah']}>
          <Routes {...defaultProps} />
        </MemoryRouter>
      </Provider>);

      expect(wrapper.find(ErrorPage)).to.have.length(1);
    });
  });

  describe('mapStateToProps', function () {
    it('maps state to props correctly', function () {
      const mockStore = {
        config: {
          lang: 'es',
        },
      };

      expect(mapStateToProps(mockStore)).to.deep.equal({
        lang: mockStore.config.lang,
      });
    });
  });
});
