import * as helpers from '../app/helpers';

describe('Helpers', () => {
  describe('#calculatePositions', () => {
    let appointments;
    const { calculatePositions } = helpers;

    beforeEach(() => {
      appointments = [{
        id: 1,
        start: '2017-02-05 19:00', // top: 0%
        end: '2017-02-05 20:00', // height: 100%
        title: 'Eat ice cream'
      }, {
        id: 2,
        start: '2017-02-05 20:30', // top: 50%
        end: '2017-02-05 22:00', // height: 150%
        title: 'Eat MOAR ice cream'
      }, {
        id: 3,
        start: '2017-02-05 23:49', // top: ~ 81%%
        end: '2017-02-06 04:00', // height: ~ 418%
        title: 'Drink beer'
      }];
    });

    it('Does not complain when receiving nothing or an empty array and returns empty array', () => {
      [
        calculatePositions(null),
        calculatePositions(undefined),
        calculatePositions([])
      ].forEach((result) => {
        expect(result).toEqual([]);
      });
    });

    // e.g. if an appointment starts at 18:30. The distance would be calculated from 18:00 = 50%
    it('calculates the appointments distance from the beginning of the previous round hour in percentage', () => {
      const result = calculatePositions(appointments);

      expect(result[0].top).toBe(0);
      expect(result[1].top).toBe(50);
      expect(result[2].top).toBe(81.66666666666667);
    });

    it('calculates the height in percentage depending on appointment duration, assuming that one hour is 100%', () => {
      const result = calculatePositions(appointments);

      expect(result[0].height).toBe(100);
      expect(result[1].height).toBe(150);
      expect(result[2].height).toBe(418.33333333333337);
    });

    it('gives non-overlapping appointments a 100% width and no positioning from the left', () => {
      const result = calculatePositions(appointments);

      result.forEach((res) => {
        expect(res.width).toBe(100);
        expect(res.left).toBe(0);
      });
    });

    it('detects direct overlaps in timeframes and adjusts widths and left appropriately', () => {
      const doubleResult = calculatePositions([
        {
          id: 1,
          start: '2017-02-05 07:00',
          end: '2017-02-05 09:00',
          title: 'Wake up'
        },
        {
          id: 2,
          start: '2017-02-05 07:00',
          end: '2017-02-05 09:00',
          title: 'Snooze'
        }
      ]);

      const tripleResult = calculatePositions([
        {
          id: 1,
          start: '2017-02-05 08:00',
          end: '2017-02-05 12:20',
          title: 'Wake up'
        },
        {
          id: 2,
          start: '2017-02-05 07:00',
          end: '2017-02-05 08:43',
          title: 'Snooze'
        },
        {
          id: 3,
          start: '2017-02-05 08:00',
          end: '2017-02-05 09:00',
          title: 'Throw out alarm clock'
        }
      ]);

      doubleResult.forEach((result) => {
        expect(result.width).toBe(50);
      });

      expect(doubleResult[0].left).toBe(0);
      expect(doubleResult[1].left).toBe(50);

      tripleResult.forEach((result) => {
        expect(parseInt(result.width, 10)).toBe(33);
      });

      expect(tripleResult[0].left).toBe(0);
      expect(parseInt(tripleResult[1].left, 10)).toBe(33);
      expect(parseInt(tripleResult[2].left, 10)).toBe(66);
    });
  });

  describe('Formatters', () => {
    describe('#formatHours', () => {
      it('formats a number of hours into an hour representation, starting from 00:00', () => {
        const result1 = helpers.formatHours(0);
        const result2 = helpers.formatHours(4);

        expect(result1).toBe('00:00');
        expect(result2).toBe('04:00');
      });

      it('should be able to work with numbers over 24 and convert them into the right time', () => {
        const result1 = helpers.formatHours(25);
        const result2 = helpers.formatHours(34);

        expect(result1).toBe('01:00');
        expect(result2).toBe('10:00');
      });
    });
  });

  describe('PropTypes', () => {
    describe('#hourNotation', () => {
      const { hour: hourValidator } = helpers.PropTypes;

      it('should be valid if the given hour is between (and including) 0 and 24', () => {
        [...Array(25).keys()].forEach((hour) => {
          expect(hourValidator({ hour }, 'hour')).toBeNull();
        });
      });

      it('should return an error if the hour given is below 0 or above 24', () => {
        const result1 = hourValidator({ hour: -1 }, 'hour');
        const result2 = hourValidator({ hour: 25 }, 'hour');

        expect(result1).toBeInstanceOf(Error);
        expect(result2).toBeInstanceOf(Error);
      });
    });
  });
});
