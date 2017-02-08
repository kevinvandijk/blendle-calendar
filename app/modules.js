import uniqid from 'uniqid';

// Constants
export const ADD_APPOINTMENT = 'blendle-calendar/ADD_APPOINTMENT';

// Action creators
export function addAppointment(appointment) {
  return {
    type: ADD_APPOINTMENT,
    payload: {
      ...appointment,
      id: uniqid()
    }
  };
}

// Data getters
export function getAppointmentsForDate(state, date) {
  return state[date] || [];
}
