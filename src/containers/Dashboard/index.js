import React, { Component } from 'react';
import ListFlights from '../../components/ListFlights';
import Header from '../../components/Header';

class Dashboard extends Component {

  render() {
    return (
      <div id="wrapper">
        <Header />
        <ListFlights />
      </div>
    );
  }
}

export default Dashboard;
