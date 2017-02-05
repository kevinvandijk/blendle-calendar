import * as helpers from '../app/helpers';

describe('Helpers', () => {
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
