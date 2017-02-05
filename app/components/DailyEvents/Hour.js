import React from 'react';
import { PropTypes } from '../../helpers';

const Hour = (props) => {
  return (
    <li className="DailyEvents-hour">
      <time>{ props.label }</time>
    </li>
  );
};

Hour.propTypes = {
  label: PropTypes.hour.isRequired
};

export default Hour;
