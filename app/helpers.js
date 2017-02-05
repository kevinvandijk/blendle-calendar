import { PropTypes as ReactPropTypes } from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

// Source: https://github.com/facebook/react/issues/1715#issuecomment-168943070
const chainablePropType = (predicate) => {
  const propType = (props, propName, componentName) => {
    // don't do any validation if empty
    if (props[propName] == null) {
      return null;
    }

    return predicate(props, propName, componentName);
  };

  propType.isRequired = (props, propName, componentName) => {
    // warn if empty
    if (props[propName] == null) {
      return new Error(`Required prop \`${propName}\` was not specified in \`${componentName}\`.`);
    }

    return predicate(props, propName, componentName);
  };

  return propType;
};

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
  hour: chainablePropType((props, propName) => {
    if (props[propName] < 0 || props[propName] > 24) {
      return new Error(`\`${propName}\` should be a valid hour`);
    }

    return null;
  })
};

export function calculatePositions(appointments, timeUnit = 'hour') {
  if (!appointments) return [];
  if (Array.isArray(appointments) && !appointments.length) return [];

  const overlaps = [];

  return appointments.map((appointment) => {
    const appointmentStart = moment(appointment.start);
    const appointmentEnd = moment(appointment.end);
    const appointmentRange = moment.range(appointmentStart, appointmentEnd);

    const appointmentOverlaps = appointments.filter((comparison) => {
      const comparisonStart = moment(comparison.start);
      const comparisonEnd = moment(comparison.end);
      const comparisonRange = moment.range(comparisonStart, comparisonEnd);

      return appointmentRange.overlaps(comparisonRange);
    });

    const width = 100 / appointmentOverlaps.length;
    const left = appointmentOverlaps.filter((o) => overlaps.includes(o.id)).length * width;
    overlaps.push(appointment.id);

    const startOfHour = appointmentStart.clone().startOf(timeUnit);
    const top = appointmentStart.diff(startOfHour, timeUnit, true) * 100;
    const height = appointmentEnd.diff(appointmentStart, timeUnit, true) * 100;

    return {
      ...appointment,
      left,
      width,
      top,
      height
    };
  });
}
