import { PropTypes as ReactPropTypes } from 'react';

// Formatters

export function formatHours(amountOfHours) {
  const hour = (amountOfHours < 24
    ? amountOfHours
    : amountOfHours % 24
  ).toString();

  return `${hour.length < 2 ? `0${hour}` : hour}:00`;
}

// Custom PropTypes, not chainable at the moment
export const PropTypes = {
  ...ReactPropTypes,
  hour(props, propName) {
    if (props[propName] < 0 || props[propName] > 24) {
      return new Error(`\`${propName}\` should be a valid hour`);
    }

    return null;
  }
};
