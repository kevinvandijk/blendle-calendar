import React from 'react';
import { formatHours, PropTypes } from '../../helpers';
import './styles.scss';

const { hour } = PropTypes;

const DailyEvents = (props) => {
  const { displayHours, startHour } = props;

  return (
    <div className="DailyEvents">
      <div className="DailyEvents-list">
        {[...Array(displayHours)].map((a, i) => (
          <li className="DailyEvents-hour">
            <time>{ formatHours(startHour + i) }</time>
          </li>
        ))}
      </div>

    </div>
  );
};

DailyEvents.propTypes = {
  displayHours: hour,
  startHour: hour
};

DailyEvents.defaultProps = {
  displayHours: 24,
  startHour: 7
};

export default DailyEvents;
