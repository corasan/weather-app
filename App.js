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

type Props = {}
export default class App extends Component<Props> {
  state = {
    locationGranted: false,
  }

  componentDidMount() {
    this.checkPermission()

    this.permission = RNLocation.subscribeToPermissionUpdates(currentPermission => {
      if (currentPermission === 'authorizedWhenInUse') {
        console.log('permission', currentPermission)
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
    const location = await RNLocation.getLatestLocation({ timeout: 60000 })
    console.log(location)
  }

  componentWillUnmount() {
    this.permission()
  }
  
  render() {
    return (
      <View style={styles.container}>
        
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
