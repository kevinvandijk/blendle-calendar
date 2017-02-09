import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { PropTypes } from '../../helpers';
import { addAppointment, getAppointmentsForDate } from '../../modules';
import DailyEvents from '../DailyEvents';
import Form from '../Form';
import InputField from '../Form/InputField';
import Button from '../Form/Button';

const { func, arrayOf, appointment } = PropTypes;

class Main extends React.Component {
  static propTypes = {
    addAppointment: func.isRequired,
    appointments: arrayOf(appointment)
  }

  state = {
    valid: false
  }

  addAppointment = (details) => {
    const date = moment().format('YYYY-MM-DD');
    const start = `${date} ${details.start}`;
    const end = `${date} ${details.end}`;

    this.props.addAppointment({
      ...details,
      start,
      end
    });

    this.setState({
      valid: false
    });
  }

  checkFields = (inputs) => {
    const toValidate = inputs;
    delete toValidate.description;

    const invalid = Object.keys(toValidate).some((name) => inputs[name].length < 1);
    this.setState({
      valid: !invalid
    });
  }

  render() {
    return (
      <div className="MainContainer">
        <header className="PageHeader">
          <h2 className="PageHeader-title">Today&#39;s appointments</h2>
        </header>
        <main className="CalendarContainer">
          <div className="AppointmentList">
            <h1 className="AppointmentList-title"><time>{ moment().format('d MMMM YYYY') }</time></h1>
            <DailyEvents displayHours={ 11 } appointments={ this.props.appointments } />
          </div>
          <div className="AddAppointment">
            <Form onSubmit={ this.addAppointment } onChange={ this.checkFields }>
              <InputField name="title" type="text" label="Title" autoFocus />
              <InputField name="start" type="date" label="Start time" />
              <InputField name="end" type="date" label="End time" />
              <InputField name="description" type="textarea" label="Description" />
              <Button label="Save" type="submit" disabled={ !this.state.valid } />
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
