import React from 'react';
import { DepartureStationPicker } from './src/DepartureStationPicker';
import { ArrivalStationPicker } from './src/ArrivalStationPicker';

export default class App extends React.Component {
  state = {
      departureCode: 'SUR',
      arrivalCode: 'WAT',
      departureName: false,
      arrivalName: false,
      trainsList: null,
      reverseJourney: null,
      journeySearch: false
  };

  getJourney() {
      const api = `https://aishamclean.co.uk/trains/list/?dep=${this.state.departureCode}&arr=${this.state.arrivalCode}`
      fetch(api)
      .then(response => response.json())
      .then(data => this.handleListTrains(data) )
      .catch( err => {
        console.log(api + ' ERROR! I\'m sorry:' + err)
      });

  getReverseJourney() {
      fetch(this.state.reverseJourney)
      .then(response => response.json())
      .then(data => this.handleListTrains(data) )
      .catch( err => {
        console.log(api + ' ERROR! I\'m sorry:' + err)
      });

  handleDepartureStation(code, name) {
    this.setState({
      departureCode: code,
      departureName: name,
    })
  }

  handleArrivalStation(code, name) {
    this.setState({
      arrivalCode: code,
      arrivalName: name,
    })
  }

  handleListTrains(data) {
    console.log(data),
    this.setState({
        trainsList: data,
        departureName: false,
        arrivalName: false,
        reverseJourney: `https://aishamclean.co.uk/trains/list/?dep=${this.state.arrivalCode}&arr=${this.state.departureCode}`
      })
    }

  const showTrains = this.state.journeySearch

  render() {
    return (
      <View>

        <View>
        <DepartureStationPicker />
        <ArrivalStationPicker />
        </View>

        <View>
          { showTrains ? null :
            <Text>{this.state.trainsList}</ Text>
          }
        </View>
      </View>
    );
  }
}
