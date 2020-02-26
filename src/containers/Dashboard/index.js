import React, { Component } from 'react';
import FlightAPI from '../../services/FlightAPI';
import ListFlights from '../../components/ListFlights';
import Header from '../../components/Header';

class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      flights: null
    }
  }

  fetchFlights = () => {
    FlightAPI.getFlights().then(res => {
      if(res.status === 200) {
        this.setState({flights: res.data.flight})
      }
    });
  }

  render() {
	const { flights } = this.state;
    return (
      <div id="wrapper">
        <Header fetchFlights={this.fetchFlights} />
        <ListFlights flights={flights} fetchFlights={this.fetchFlights} />
      </div>
    );
  }

  componentDidMount() {
    this.fetchFlights();
  }
}

export default Dashboard;
