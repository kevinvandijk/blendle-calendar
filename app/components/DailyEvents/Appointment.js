import React from 'react';
import moment from 'moment';
import { PropTypes } from '../../helpers';

const { string } = PropTypes;

// h-calendar 2.0 compatible
const Appointment = (props) => {
  const style = {
    width: props.width,
    height: props.height,
    top: props.top,
    left: props.left
  };

  const start = moment(props.start);
  const end = moment(props.end);

  return (
    <dl className="DailyEvents-Appointment h-event" style={ style }>
      <dt className="DailyEvents-Appointment-time">
        <time className="dt-start" dateTime={ start.format() }>{ start.format('HH:mm') }</time>
        -
        <time className="dt-end" dateTime={ end.format() }>{ end.format('HH:mm') }</time>
      </dt>
      <dd className="DailyEvents-Appointment-content">
        <h1 className="DailyEvents-Appointment-title p-name">{ props.title }</h1>
        { props.description &&
          <p className="DailyEvents-Appointment-description p-summary">{ props.description }</p>
        }
      </dd>
    </dl>
  );
};

Appointment.propTypes = {
  width: string.isRequired,
  height: string.isRequired,
  top: string.isRequired,
  left: string.isRequired,
  title: string.isRequired,
  start: string.isRequired,
  end: string.isRequired,
  description: string
};

export default Appointment;
