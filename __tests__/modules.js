import * as ducks from '../app/modules';

describe('Ducks', () => {
  describe('Action Creators', () => {
    describe('#addAppointment', () => {
      const { addAppointment, ADD_APPOINTMENT } = ducks;

      it('Creates an action object', () => {
        const result = addAppointment({});
        expect(result).toEqual(
          expect.objectContaining({
            type: ADD_APPOINTMENT,
            payload: expect.any(Object)
          })
        );
      });

      it('Puts the appointment object in the payload', () => {
        const sample = {
          start: new Date(),
          end: new Date(),
          title: 'Something'
        };

        const result = addAppointment(sample);
        expect(result).toEqual(
          expect.objectContaining({
            payload: expect.objectContaining(sample)
          })
        );
      });

      it('Adds a uniqid to the appointment payload', () => {
        jest.mock('uniqid');

        const result = addAppointment({});
        expect(result.payload.id).toBe('uniqid');

        jest.unmock('uniqid');
      });
    });
  });

  describe('Data Getters', () => {
    describe('#getAppointmentsForDate', () => {
      const { getAppointmentsForDate } = ducks;

      it('Returns an empty array when state empty', () => {
        const result = getAppointmentsForDate({}, '2010');

        expect(result).toEqual([]);
      });

      it('Returns appointments for a given date', () => {
        const date = '2042-03-03';
        const state = {
          [date]: ['something', 'something else']
        };

        const result = getAppointmentsForDate(state, date);
        expect(result).toEqual(state[date]);
      });
    });
  });
});
