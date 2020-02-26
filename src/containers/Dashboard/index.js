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

  render() {
	const { flights } = this.state;
    return (
      <div id="wrapper">
        <Header />
        <ListFlights flights={flights} />
      </div>
    );
  }

  componentDidMount() {
    FlightAPI.getFlights().then(res => {
      if(res.status === 200) {
        this.setState({flights: res.data.flight})
      }
    });
  }
}

export default Dashboard;
