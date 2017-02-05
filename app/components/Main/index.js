import React from 'react';
import DailyEvents from '../DailyEvents';

export default class Main extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h2>Today&#39;s appointments</h2>
        </header>
        <main>
          <DailyEvents />
        </main>
      </div>
    );
  }
}
