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

    it('Renders given appointments and looks at the time only (only care about start and end hour)', () => {
      const appointments = [
        {
          id: 1,
          start: '2017-02-08 08:00',
          end: '2017-02-08 17:00',
          title: 'Being awake'
        },
        {
          id: 2,
          start: '2017-02-08 07:00',
          end: '2017-02-08 09:20',
          title: 'Wake up'
        },
        {
          id: 3,
          start: '2017-02-08 07:00',
          end: '2017-02-08 08:43',
          title: 'Snooze'
        },
        {
          id: 4,
          start: '2017-02-08 09:20',
          end: '2017-02-08 10:00',
          title: 'Throw out alarm clock'
        }
      ];

      const tree = renderer.create(
        <DailyEvents appointments={ appointments } />
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
