import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Form from '..';

function createMockInputComponent(name, value) {
  return {
    props: {
      name
    },
    getValue() {
      return value;
    }
  };
}

describe('Components', () => {
  describe('Form', () => {
    it('Renders itself with children', () => {
      const tree = renderer.create(
        <Form>
          <div>Form children woot</div>
        </Form>
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('Provides a childContext to attach input fields to and control the form with', () => {
      // just a sanity check so that childContext isn't accidentally deleted this would potentially
      // cause silent errors since InputFields are flexible and work without context as well
      const expected = ['attach', 'detach', 'reset', 'submit'].sort();
      expect(Object.keys(Form.childContextTypes).sort()).toEqual(expected);
    });

    it('Attaches components and is able to return their values, sorted by name', () => {
      const name1 = 'A component has no name';
      const name2 = 'A component always pays its debts';
      const value = 'Value is coming';
      const instance = shallow(<Form />).instance();

      instance.attach(createMockInputComponent(name1, value));
      instance.attach(createMockInputComponent(name2, value));

      const result = instance.getValues();

      expect(result).toEqual({
        [name1]: value,
        [name2]: value
      });
    });

    it('Detaches components and does not include their values anymore in the return value', () => {
      const mockComponent = createMockInputComponent('bla');
      const instance = shallow(<Form />).instance();

      instance.attach(mockComponent);
      instance.detach(mockComponent);

      const result = instance.getValues();

      expect(result).toEqual({});
    });

    it('Calls a given onSubmit handler on submit with the collected values', () => {
      const name = 'A component has no name';
      const value = 'Value is coming';
      const mockComponent = createMockInputComponent(name, value);
      const submitStub = jest.fn();

      const instance = shallow(<Form onSubmit={ submitStub } />).instance();
      instance.attach(mockComponent);
      instance.submit();

      expect(submitStub).toHaveBeenCalledWith({
        [name]: value
      });
    });

    it('Sets the values of attached input fields to an empty string', () => {
      const instance = shallow(<Form />).instance();
      const stub1 = jest.fn();
      const stub2 = jest.fn();
      const mock1 = createMockInputComponent('bla', 'something');
      const mock2 = createMockInputComponent('blabla', 'something else');

      mock1.setValue = stub1;
      mock2.setValue = stub2;

      instance.attach(mock1);
      instance.attach(mock2);
      instance.reset();

      expect(stub1).toHaveBeenCalledWith('');
      expect(stub2).toHaveBeenCalledWith('');
    });
  });
});
