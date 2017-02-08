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

function sortByTimeRange(items) {
  return items.sort((a, b) => {
    const rangeA = moment().range(a.start, a.end);
    const rangeB = moment().range(b.start, b.end);

    // Longest ranges should move to the front
    if (rangeA < rangeB) return 1;
    if (rangeA > rangeB) return -1;

    const startA = moment(a.start);
    const startB = moment(b.start);

    if (startA < startB) return -1;
    if (startA > startB) return 1;

    return 0;
  });
}

function getOrganizedAppointments(appointments) {
  return appointments.map((currentAppointment) => {
    const currentRange = moment().range(currentAppointment.start, currentAppointment.end);
    const rawOverlaps = [];
    const overlaps = [];

    for (let i = 0; i < appointments.length; i++) {
      const comparisonAppointment = appointments[i];

      if (comparisonAppointment.id !== currentAppointment.id) {
        const comparisonRange = moment().range(
          comparisonAppointment.start,
          comparisonAppointment.end
        );

        if (comparisonRange.overlaps(currentRange)) {
          const previousOverlap = rawOverlaps[rawOverlaps.length - 1];

          if (previousOverlap) {
            if (previousOverlap.end > comparisonAppointment.start) {
              overlaps.push(comparisonAppointment.id);
            }
          } else {
            overlaps.push(comparisonAppointment.id);
          }

          rawOverlaps.push(comparisonAppointment);
        }
      }
    }

    return {
      ...currentAppointment,
      overlaps
    };
  });
}

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

  const sortedAppointments = sortByTimeRange(appointments);
  const overlappedAppointments = getOrganizedAppointments(sortedAppointments);

  const findSortedIndex = (id) => {
    return overlappedAppointments.findIndex((item) => item.id === id);
  };

  const findAppointment = (id) => {
    return overlappedAppointments.find((app) => app.id === id);
  };

  for (let i = 0; i < overlappedAppointments.length; i++) {
    const currentAppointment = overlappedAppointments[i];
    let left = 0;
    let width = 100;

    if (currentAppointment.overlaps.length) {
      const currentSortedIndex = findSortedIndex(currentAppointment.id);

      const prevOverlaps = currentAppointment.overlaps.filter((overlapId) => {
        return findSortedIndex(overlapId) < currentSortedIndex;
      });

      const nextOverlaps = currentAppointment.overlaps.filter((overlapId) => {
        return findSortedIndex(overlapId) > currentSortedIndex;
      });

      if (!prevOverlaps.length) {
        width = (100 / (nextOverlaps.length + 1));
      } else {
        const prevWidth = prevOverlaps.reduce((total, overlapId, c, all) => {
          const earlierAppointment = findAppointment(all[c - 1]);

          // Make sure the previous overlap isn't actually just an appointment
          // that ends before this one, if so: no need to position it differently
          if (earlierAppointment) {
            const overlappingAppointment = findAppointment(overlapId);

            if (moment(earlierAppointment.end) <= moment(overlappingAppointment.start)) {
              return total;
            }
          }

          return total + (findAppointment(overlapId).width || 0);
        }, 0);

        left = prevWidth;
        width = width - prevWidth;

        if (nextOverlaps.length) {
          width = width / (nextOverlaps.length + 1);
        }
      }
    }

    const startOfHour = moment(currentAppointment.start).startOf(timeUnit);
    const currentStart = moment(currentAppointment.start);
    const currentEnd = moment(currentAppointment.end);

    currentAppointment.left = left;
    currentAppointment.width = width;
    currentAppointment.top = currentStart.diff(startOfHour, timeUnit, true) * 100;
    currentAppointment.height = currentEnd.diff(currentStart, timeUnit, true) * 100;
  }

  return overlappedAppointments;
}
