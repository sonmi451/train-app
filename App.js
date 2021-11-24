import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StationCodes } from './src/StationCodes.js';

export default class App extends React.Component {
  state = {
      sationCodes: StationCodes,
      departureCode: 'SUR',
      arrivalCode: 'WAT',
      departureName: 'Surbiton',
      arrivalName: 'London Waterloo',
      trainsList: null,
      reverseJourney: null,
      journeySearch: false
  };

  getJourney() {
      const api = `https://aishamclean.co.uk/trains/list/?dep=${this.state.departureCode}&arr=${this.state.arrivalCode}`
      fetch(api)
      .then(response => response.json())
      .then(data => this.handleListTrains(data))
      .catch( err => {
        console.log(api + ' ERROR! I\'m sorry:' + err)
      });
    }

  getReverseJourney() {
      fetch(this.state.reverseJourney)
      .then(response => response.json())
      .then(data => this.handleListTrains(data))
      .catch( err => {
        console.log(api + ' ERROR! I\'m sorry:' + err)
      });
    }

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
    console.log(this.state.arrivalName),
    this.setState({
        journeySearch: true,
        trainsList: data.trains,
        reverseJourney: `https://aishamclean.co.uk/trains/list/?dep=${this.state.arrivalCode}&arr=${this.state.departureCode}`
      })
    }

  render() {
    const ReverseJourney = <Button
                             onPress={ this.getReverseJourney.bind(this) }
                             color='orange'
                             title='Reverse Journey'
                             />

    const TrainsList = <View>
                        <FlatList
                          data={this.state.trainsList}
                          renderItem={
                            ({ item }) =>
                              <View>
                                <Text>{item.train_info.train_times} </Text>
                                {item.extra_train_info.platform ? <Text>{item.extra_train_info.platform}</Text> : null }
                                {item.extra_train_info.length ? <Text>{item.extra_train_info.length}</Text> : null }
                                {item.extra_train_info.delay_info ? <Text>{item.extra_train_info.delay_info}</Text> : null }
                                <Text>{item.intermediate_stations.number_stops}</Text>
                                {item.intermediate_stations.intermediate_stations == this.state.arrivalName ? null : <Text>{item.intermediate_stations.intermediate_stations}</Text> }
                                <Text>*************************************</Text>
                              </View>
                            }
                          />
                      </View>

    return (
      <View style={styles.screenContainer}>
        <Picker
          selectedValue={this.state.departureCode}
          onValueChange={ (value, label) => this.handleDepartureStation(value, label) }
          mode='dropdown' // Android only
          >
        <Picker.Item value='SUR' label='Surbiton' />
        <Picker.Item value='CLJ' label='Clapham Junction' />
        <Picker.Item value='WAT' label='London Waterloo' />
        </Picker>
        <Picker
          selectedValue={this.state.arrivalCode}
          onValueChange={ (value, label) => this.handleArrivalStation(value, label) }
          mode='dropdown' // Android only
          >
        <Picker.Item value='SUR' label='Surbiton' />
        <Picker.Item value='CLJ' label='Clapham Junction' />
        <Picker.Item value='WAT' label='London Waterloo' />
        </Picker>
        <Button
          onPress={ this.getJourney.bind(this) }
          color='orange'
          title='Search'
          />
          {this.state.journeySearch ? TrainsList : null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 10,
    paddingRight: 10,
  }
});
