import React from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import Hour from './Hour';
import Appointment from './Appointment';
import { formatHours, PropTypes, calculatePositions } from '../../helpers';
import './styles.scss';

const moment = extendMoment(Moment);

const { hour, bool, array } = PropTypes;

const DailyEvents = (props) => {
  const { scrollable, displayHours, startHour } = props;
  let listClassName = 'DailyEvents-list';
  if (scrollable) listClassName = `${listClassName} DailyEvents-list--is-scrollable`;

  const appointments = calculatePositions(props.appointments);

  return (
    <div className="DailyEvents">
      <div className={ listClassName }>
        {[...Array(displayHours)].map((a, i) => {
          // TODO: None of this should be done here
          // appointments should be passed into props in a different format
          // will fix when introducing redux
          const normalizedHour = startHour + i;
          const startOfHour = moment().hour(normalizedHour).startOf('hour');
          const endOfHour = moment().hour(normalizedHour).endOf('hour');

          const display = appointments.filter((event) => {
            return moment(event.start).within(moment.range(startOfHour, endOfHour));
          });

          return (
            <Hour
              key={ `hour-${startHour + i}` }
              label={ formatHours(startHour + i) }
            >
              {
                display.map((event) => {
                  return (
                    <Appointment
                      title={ event.title }
                      description={ event.description }
                      start={ event.start }
                      end={ event.end }
                      top={ event.top }
                      height={ event.height }
                      width={ event.width }
                      left={ event.left }
                    />
                  );
                })
              }
            </Hour>
          );
        })}
      </div>

    </div>
  );
};

DailyEvents.propTypes = {
  displayHours: hour,
  startHour: hour,
  scrollable: bool,
  appointments: array
};

DailyEvents.defaultProps = {
  displayHours: 24,
  startHour: 7,
  scrollable: false,
  appointments: []
};

export default DailyEvents;
