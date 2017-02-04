import React from 'react';
import renderer from 'react-test-renderer';

const TestApp = () => {
  return <div>Test</div>;
};

it('runs tests', () => {
  expect(true).toBeTruthy();
});

it('is able to test React components', () => {
  const component = renderer.create(<TestApp />);
  const tree = component.toJSON();
  expect(tree).toBeTruthy();
});
