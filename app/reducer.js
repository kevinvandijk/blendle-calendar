import { ADD_APPOINTMENT } from './modules';

const initialState = {
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_APPOINTMENT: {
      const { payload } = action;
      const [date] = payload.start.split(' ');

      return {
        ...state,
        [date]: [
          ...(state[date] || []),
          payload
        ]
      };
    }
    default:
      return state;
  }
}
