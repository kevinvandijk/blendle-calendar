import React from 'react';
import { PropTypes } from '../../helpers';

const { hour, node } = PropTypes;

const Hour = (props) => {
  return (
    <li className="DailyEvents-Hour">
      <time>{ props.label }</time>
      { props.children }
    </li>
  );
};

Hour.propTypes = {
  label: hour.isRequired,
  children: node
};

export default Hour;
