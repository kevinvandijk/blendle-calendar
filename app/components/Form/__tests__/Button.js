import React from 'react';
import renderer from 'react-test-renderer';
import stubContext from 'react-stub-context';
import { shallow, mount } from 'enzyme';
import Button from '../Button';

describe('Components', () => {
  describe('Form/Button', () => {
    it('Renders a default button', () => {
      const tree = renderer.create(
        <Button label="Stuff" />
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('Renders a button with different styling when type is submit', () => {
      const tree = renderer.create(
        <Button label="Stuff" type="submit" />
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('Calls the given onClick handler when the button is clicked with the original event', () => {
      const mockEvent = {
        preventDefault() {}
      };
      const stub = jest.fn();
      const wrapper = shallow(<Button label="hello" onClick={ stub } />);

      wrapper.find('button').simulate('click', mockEvent);

      expect(stub).toHaveBeenCalledWith(mockEvent);
    });

    it('Calls context#submit for submit buttons if context is available', () => {
      const mockEvent = {
        preventDefault() {}
      };
      const submitStub = jest.fn();
      const ButtonWithContext = stubContext(Button, {
        submit: submitStub
      });
      const buttonWrapper = shallow(<Button label="a" type="submit" />);

      buttonWrapper.find('button').simulate('click', mockEvent);

      expect(submitStub).not.toHaveBeenCalled();

      const contextWrapper = mount(<ButtonWithContext label="hello" type="submit" />);

      contextWrapper.find('button').simulate('click', mockEvent);
      expect(submitStub).toHaveBeenCalled();
    });

    it('Calls context#reset for reset buttons if context is available', () => {
      const mockEvent = {
        preventDefault() {}
      };
      const resetStub = jest.fn();
      const ButtonWithContext = stubContext(Button, {
        reset: resetStub
      });

      const buttonWrapper = shallow(<Button label="a" type="reset" />);
      buttonWrapper.find('button').simulate('click', mockEvent);
      expect(resetStub).not.toHaveBeenCalled();

      const contextWrapper = mount(<ButtonWithContext label="hello" type="reset" />);
      contextWrapper.find('button').simulate('click', mockEvent);
      expect(resetStub).toHaveBeenCalled();
    });

    it('Calls the onClick prop also when context is available', () => {
      const mockEvent = {
        preventDefault() {}
      };
      const submitStub = jest.fn();
      const submitClickStub = jest.fn();
      const resetStub = jest.fn();
      const resetClickStub = jest.fn();
      const ButtonWithContext = stubContext(Button, {
        submit: submitStub,
        reset: resetStub
      });

      const submitWrapper = mount(<ButtonWithContext label="hello" type="submit" onClick={ submitClickStub } />);
      const resetWrapper = mount(<ButtonWithContext label="hello" type="reset" onClick={ resetClickStub } />);

      submitWrapper.find('button').simulate('click', mockEvent);
      expect(submitClickStub).toHaveBeenCalled();
      expect(submitStub).toHaveBeenCalled();

      resetWrapper.find('button').simulate('click', mockEvent);
      expect(resetClickStub).toHaveBeenCalled();
      expect(resetStub).toHaveBeenCalled();
    });
  });
});
