import React from 'react';
import { formatHours } from '../../helpers';
import './styles.scss';


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

const isValidHour = (props, propName) => {
  // TODO
  return null;
};

DailyEvents.propTypes = {
  displayHours: isValidHour,
  startHour: isValidHour
};

DailyEvents.defaultProps = {
  displayHours: 24,
  startHour: 7
};

export default DailyEvents;
