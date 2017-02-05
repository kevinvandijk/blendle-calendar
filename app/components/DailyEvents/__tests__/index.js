import React from 'react';
import renderer from 'react-test-renderer';
import DailyEvents from '../';

describe('Components', () => {
  describe('DailyEvents', () => {
    it('Renders with defaults', () => {
      const tree = renderer.create(
        <DailyEvents />
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('Changes the amount of displayed hours and the starting hour', () => {
      const tree = renderer.create(
        <DailyEvents displayHours={ 12 } startHour={ 9 } />
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('Renders a scrollable list', () => {
      const tree = renderer.create(
        <DailyEvents scrollable />
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
