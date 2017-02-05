import React from 'react';

// h-calendar 2.0 compatible
const Appointment = (props) => {
  console.log('props', props.left);
  return (
    <dl className="DailyEvents-Appointment h-event" style={{ width: `${props.width}%`, height: `${props.height}%`, top: `${props.top}%`, left: `${props.left}%` }}>
      <dt className="DailyEvents-Appointment-time"><time className="dt-start" dateTime="2013-06-30 18:00"></time>-<time className="dt-end" dateTime=""></time></dt>
      <dd className="DailyEvents-Appointment-content">
        <h1 className="DailyEvents-Appointment-title p-name">{ props.title }</h1>
        <p className="DailyEvents-Appointment-description p-summary">Lorem ipsum dolor</p>
      </dd>
    </dl>
  );
};

export default Appointment;
