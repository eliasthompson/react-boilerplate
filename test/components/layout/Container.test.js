import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Helmet } from 'react-helmet';

import { Container, mapStateToProps } from '../../../src/components/layout/Container';

describe('Component: Container', function () {
  const sandbox = sinon.createSandbox();
  const defaultProps = {
    lang: 'en',
  };
  let wrapper;

  beforeEach(function () {
    wrapper = shallow(<Container {...defaultProps} />);
  });

  afterEach(function () {
    wrapper.unmount();
    sandbox.restore();
  });

  describe('render', function () {
    it('renders correctly', function () {
      expect(wrapper.find(Helmet)).to.have.length(1);
      expect(wrapper.find('.container')).to.have.length(1);
      expect(wrapper.find('withRouter(Connect(Routes))')).to.have.length(1);
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
