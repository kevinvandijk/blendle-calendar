import { PropTypes as ReactPropTypes } from 'react';

// Source: https://github.com/facebook/react/issues/1715#issuecomment-168943070
const chainablePropType = (predicate) => {
  const propType = (props, propName, componentName) => {
    // don't do any validation if empty
    if (props[propName] == null) {
      return null;
    }

    return predicate(props, propName, componentName);
  }

  propType.isRequired = (props, propName, componentName) => {
    // warn if empty
    if (props[propName] == null) {
      return new Error(`Required prop \`${propName}\` was not specified in \`${componentName}\`.`);
    }

    return predicate(props, propName, componentName);
  }

  return propType;
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
