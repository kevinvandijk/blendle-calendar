import React from 'react';
import Hour from './Hour';
import { formatHours, PropTypes } from '../../helpers';
import './styles.scss';

const { hour, bool } = PropTypes;

const DailyEvents = (props) => {
  const { scrollable, displayHours, startHour } = props;
  let listClassName = 'DailyEvents-list';
  if (scrollable) listClassName = `${listClassName} DailyEvents-list--is-scrollable`;

  return (
    <div className="DailyEvents">
      <div className={ listClassName }>
        {[...Array(displayHours)].map((a, i) => (
          <Hour
            key={ `hour-${startHour + i}` }
            label={ formatHours(startHour + i) }
          />
        ))}
      </div>

    </div>
  );
};

DailyEvents.propTypes = {
  displayHours: hour,
  startHour: hour,
  scrollable: bool
};

DailyEvents.defaultProps = {
  displayHours: 24,
  startHour: 7,
  scrollable: false
};

export default DailyEvents;
