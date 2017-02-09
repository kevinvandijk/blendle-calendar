import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { PropTypes } from '../../helpers';
import { addAppointment, getAppointmentsForDate } from '../../modules';
import DailyEvents from '../DailyEvents';
import Form from '../Form';
import InputField from '../Form/InputField';
import Button from '../Form/Button';

const { func, array } = PropTypes;

class Main extends React.Component {
  static propTypes = {
    addAppointment: func.isRequired,
    appointments: array
  }

  render() {
    return (
      <div className="MainContainer">
        <header className="PageHeader">
          <h2 className="PageHeader-title">Today&#39;s appointments</h2>
        </header>
        <main className="CalendarContainer">
          <div className="AppointmentList">
            <h1 className="AppointmentList-title"><time>1 augustus 2016</time></h1>
            <DailyEvents displayHours={ 11 } appointments={ this.props.appointments } />
          </div>
          <div className="AddAppointment">
            <Form>
              <InputField name="title" type="text" label="Title" />
              <InputField name="start" type="date" label="Start time" />
              <InputField name="end" type="date" label="End time" />
              <InputField name="description" type="textarea" label="Description" />
              <Button label="Save" type="submit" />
              <Button label="Cancel" type="reset" />
            </Form>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appointments: getAppointmentsForDate(state, moment().format('YYYY-MM-DD'))
  };
};

const mapDispatchToProps = {
  addAppointment
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
