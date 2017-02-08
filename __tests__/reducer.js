import reducer from '../app/reducer';
import { ADD_APPOINTMENT } from '../app/modules';

function createAction(type, payload) {
  return {
    type,
    payload
  };
}
describe('Reducer', () => {
  describe('default', () => {
    it('Returns the given state by default', () => {
      const state = {
        something: 'here'
      };

      const result = reducer(state, {});

      expect(result).toEqual(state);
    });
  });

  it('Merges an appointment into state and keys it by date', () => {
    const date1 = '2018-04-05 10:00';
    const date2 = '2018-04-06 10:00';
    const emptyState = {};
    const payload1 = {
      start: date1,
      title: 'hello'
    };
    const payload2 = {
      start: date1,
      title: 'another one'
    };
    const payload3 = {
      start: date2,
      title: 'other date'
    };

    const key1 = date1.split(' ')[0];
    const key2 = date2.split(' ')[0];

    const result1 = reducer(emptyState, createAction(ADD_APPOINTMENT, payload1));
    expect(result1[key1].length).toBe(1);
    expect(result1[key1][0]).toEqual(payload1);

    const result2 = reducer(result1, createAction(ADD_APPOINTMENT, payload2));
    expect(result2[key1].length).toBe(2);
    expect(result2[key1][0]).toEqual(payload1);
    expect(result2[key1][1]).toEqual(payload2);

    const result3 = reducer(result2, createAction(ADD_APPOINTMENT, payload3));
    expect(result3[key1].length).toBe(2);
    expect(result3[key2].length).toBe(1);
    expect(result3[key2][0]).toEqual(payload3);
  });
});
