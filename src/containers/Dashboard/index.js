import React, { Component } from 'react';
import { connect } from "react-redux";
import ListFlights from '../../components/ListFlights';
import Header from '../../components/Header';

class Dashboard extends Component {

  shouldComponentUpdate(nextProps) {
    if(!nextProps.flights) {
      return false;
    }
    return true;
  }

  render() {
	const { flights } = this.props;
    return (
      <div id="wrapper">
        <Header />
        <ListFlights flights={flights} />
      </div>
    );
  }

  componentDidMount() {
    this.props.requestFlights();
  }
}

const mapStateToProps = state => {
  return { ...state.flights };
};

const mapDispatchToProps = dispatch => {
  return {
    requestFlights: () => dispatch({ type: "FLIGHT_API_CALL_REQUEST" })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
