import React from 'react';
import DailyEvents from '../DailyEvents';

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
      <div>
        <header>
          <h2>Today&#39;s appointments</h2>
        </header>
        <main>
          <DailyEvents displayHours={ 11 } appointments={ appointments } />
        </main>
      </div>
    );
  }
}
