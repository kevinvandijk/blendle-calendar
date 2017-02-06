import React from 'react';
import DailyEvents from '../DailyEvents';
import Form from '../Form';
import InputField from '../Form/InputField';
import Button from '../Form/Button';

const appointments = [
  {
    start: '2017-02-05 11:00',
    end: '2017-02-05 12:00',
    title: 'First',
    id: 1
  },
  {
    start: '2017-02-05 11:30',
    end: '2017-02-05 12:30',
    title: 'Second',
    id: 2
  },
  {
    start: '2017-02-05 13:00',
    end: '2017-02-05 14:30',
    title: 'Second',
    id: 3
  },
  {
    start: '2017-02-05 08:30',
    end: '2017-02-05 12:30',
    title: 'Second',
    id: 4
  }
];

export default class Main extends React.Component {
  render() {
    return (
      <div className="MainContainer">
        <header className="PageHeader">
          <h2 className="PageHeader-title">Today&#39;s appointments</h2>
        </header>
        <main className="CalendarContainer">
          <div className="AppointmentList">
            <h1 className="AppointmentList-title"><time>1 augustus 2016</time></h1>
            <DailyEvents displayHours={ 11 } appointments={ appointments } />
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
