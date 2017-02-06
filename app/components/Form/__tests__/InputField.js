import React from 'react';
import renderer from 'react-test-renderer';
import stubContext from 'react-stub-context';
import { shallow, mount } from 'enzyme';
import InputField from '../InputField';

describe('Components', () => {
  describe('Form', () => {
    it('Renders an input field without a label', () => {
      const tree = renderer.create(
        <InputField name="name" />
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('Renders an input field with a label when label is given', () => {
      const tree = renderer.create(
        <InputField name="name" label="The label yo" />
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('Renders a date input when type is set to date', () => {
      const tree = renderer.create(
        <InputField name="name" type="date" />
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('Renders a textarea when type is set to textarea', () => {
      const tree = renderer.create(
        <InputField name="name" type="textarea" />
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('Returns the current value', () => {
      const value = 'Panda panda';
      const wrapper = shallow(<InputField name="name" value={ value } />);
      const instance = wrapper.instance();
      const initialResult = instance.getValue();

      expect(initialResult).toBe(value);

      const newValue = 'Panda?';
      wrapper.setState({ value: newValue });

      expect(instance.getValue()).toBe(newValue);
    });

    it('Sets a new value', () => {
      const value = 'Panda panda';
      const instance = shallow(<InputField name="name" />).instance();
      instance.setValue(value);

      const result = instance.getValue();
      expect(result).toBe(value);
    });

    it('Attaches to a form on mount when it has an attach method available within context', () => {
      const attachStub = jest.fn();
      const InputFieldWithContext = stubContext(InputField, {
        attach: attachStub
      });

      mount(<InputFieldWithContext name="bla" />);

      expect(attachStub).toHaveBeenCalled();
    });

    it('Detaches from a form on unmount when it has a detach method available within context', () => {
      const detachStub = jest.fn();
      const InputFieldWithContext = stubContext(InputField, {
        detach: detachStub
      });

      const wrapper = mount(<InputFieldWithContext name="bla" />);
      wrapper.unmount();

      expect(detachStub).toHaveBeenCalled();
    });
  });
});
