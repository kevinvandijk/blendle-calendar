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
});
