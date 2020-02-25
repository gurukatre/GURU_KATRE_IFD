import axios from "axios";
class FlightAPI {
    constructor() {
        if (!!FlightAPI.instance) {
            return FlightAPI.instance;
        }

        FlightAPI.instance = this;
        this.API_URL = process.env.REACT_APP_API_URL
        this.FLIGHT_URL = process.env.REACT_APP_FLIGHT_URL
        return this;
    }
    
    getFlights(){
        return axios({
            method: "get",
            url: this.API_URL + this.FLIGHT_URL
          });
    }

    postFlight(data){
        return axios({
            method: "post",
            url: this.API_URL + this.FLIGHT_URL,
            data: data
          });
    }
  
    putFlight(data){
        return axios({
            method: "put",
            url: this.API_URL + this.FLIGHT_URL,
            data: {...data}
          });
    }

    deleteFlights(data){
        return axios({
            method: "delete",
            url: this.API_URL + this.FLIGHT_URL,
            data: data
          });
    }
}
export default new FlightAPI();