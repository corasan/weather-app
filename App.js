/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import RNLocation from 'react-native-location'
import CurrentWeather from '@components/CurrentWeather'

type Props = {}
export default class App extends Component<Props> {
  state = {
    locationGranted: false,
    longitude: null,
    latitude: null,
  }

  componentDidMount() {
    this.checkPermission()

    this.permission = RNLocation.subscribeToPermissionUpdates(currentPermission => {
      if (currentPermission === 'authorizedWhenInUse') {
        this.getLocation()
      }
    })
  }

  checkPermission = async () => {
    const permission = await RNLocation.checkPermission({ ios: 'whenInUse' })
    this.setState({ permission })
    if (!permission) {
      await RNLocation.requestPermission({ ios: 'whenInUse' });
    } else {
      this.getLocation()
    }
  }

  getLocation = async () => {
    const { longitude, latitude } = await RNLocation.getLatestLocation({ timeout: 60000 })
    this.setState({ longitude, latitude })
  }

  componentWillUnmount() {
    this.permission()
  }
  
  render() {
    const { longitude, latitude } = this.state
    return (
      <View style={styles.container}>
        <CurrentWeather long={longitude} lat={latitude} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
