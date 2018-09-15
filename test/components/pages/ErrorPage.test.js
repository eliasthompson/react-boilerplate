import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import ErrorPage from '../../../src/components/pages/ErrorPage';

describe('Component: ErrorPage', function () {
  const sandbox = sinon.createSandbox();
  const defaultProps = {
    error: 'notFound',
  };
  let wrapper;

  beforeEach(function () {
    wrapper = shallow(<ErrorPage {...defaultProps} />);
  });

  afterEach(function () {
    wrapper.unmount();
    sandbox.restore();
  });

  describe('render', function () {
    it('renders correctly', function () {
      expect(wrapper.find('.page')).to.have.length(1);
    });
  });
});
