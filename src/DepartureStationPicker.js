const DepartureStationPicker = (
  <View>
  <Picker
      selectedValue={this.state.start2}
      onValueChange={ (value, label) => this.handleDepartureStation(value, label) }
      mode='dropdown' // Android only
    >
    <Picker.Item label='SUR' value='Surbiton' />
    <Picker.Item label='CLJ' value='Clapham Junction' />
    <Picker.Item label='WAT' value='London Waterloo' />
  </Picker>
  </View>
)
