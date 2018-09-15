import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { ExampleComponent, mapStateToProps } from '../../../src/components/controls/ExampleComponent';

describe('Component: ExampleComponent', function () {
  const sandbox = sinon.createSandbox();
  const updateConfigSpy = sandbox.spy();
  const historyReplaceSpy = sandbox.spy();
  const defaultProps = {
    updateConfig: updateConfigSpy,
    history: {
      replace: historyReplaceSpy,
    },
    lang: 'en',
    match: {
      params: {
        lang: 'en',
      },
    },
  };
  let wrapper;

  beforeEach(function () {
    wrapper = shallow(<ExampleComponent {...defaultProps} />);
  });

  afterEach(function () {
    updateConfigSpy.resetHistory();
    historyReplaceSpy.resetHistory();
    wrapper.unmount();
    sandbox.restore();
  });

  describe('constructor', function () {
    it('updates the redux store if it doesn\'t match the URL param', function () {
      const props = {
        updateConfig: updateConfigSpy,
        lang: 'en',
        match: {
          params: {
            lang: 'es',
          },
        },
      };

      wrapper.unmount();
      wrapper = shallow(<ExampleComponent {...props} />);
      expect(updateConfigSpy).to.have.been.calledOnce;
    });

    it('doesn\'t update the redux store if it matches the URL param', function () {
      expect(updateConfigSpy).to.have.been.not.called;
    });
  });

  describe('componentDidUpdate', function () {
    it('corrects URL if param does not redux state', function () {
      wrapper.setProps({
        history: {
          replace: historyReplaceSpy,
        },
        lang: 'es',
      });

      expect(historyReplaceSpy).to.have.been.calledOnce;
      expect(historyReplaceSpy).to.have.been.calledWithExactly('/es');
    });

    it('does not correct URL if param matches redux state', function () {
      wrapper.setProps({
        history: {
          replace: historyReplaceSpy,
        },
        lang: 'en',
      });

      expect(historyReplaceSpy).to.have.been.not.called;
    });
  });

  describe('handleLanguageChange', function () {
    it('sets language to next language', function () {
      wrapper.instance().handleLanguageChange();

      expect(updateConfigSpy).to.have.been.calledOnce;
      expect(updateConfigSpy).to.have.been.calledWithExactly({ lang: 'es' });
    });

    it('sets language to first language is at last language', function () {
      wrapper.setProps({
        updateConfig: updateConfigSpy,
        lang: 'ar',
      });
      wrapper.instance().handleLanguageChange();

      expect(updateConfigSpy).to.have.been.calledOnce;
      expect(updateConfigSpy).to.have.been.calledWithExactly({ lang: 'en' });
    });
  });

  describe('render', function () {
    it('renders correctly', function () {
      expect(wrapper.find('.example-component')).to.have.length(1);
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
