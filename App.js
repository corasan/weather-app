/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, useState, useEffect } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import RNLocation from 'react-native-location'
import CurrentWeather from '@components/Weather/CurrentTemp'
import WeatherLocation from '@components/Weather/WeatherLocation'

export default function App() {
  const [permission, setPermission] = useState(false)
  const [longitude, setLongitude] = useState(null)
  const [latitude, setLatitude] = useState(null)

  useEffect(() => {
    const permissionUpdate = RNLocation.subscribeToPermissionUpdates(handlePermissionUpdate)
    checkPermission()

    return function cleanup() {
      permissionUpdate()
    }
  }, [])

  const handlePermissionUpdate = (authorization) => {
    if (authorization === 'authorizedWhenInUse') {
      setPermission(true)
    }
  }

  useEffect(() => {
    if (!permission) {
      requestPermission()
    } else {
      getLocation()
    }
  }, [permission])

  checkPermission = async () => {
    const result = await RNLocation.checkPermission({ ios: 'whenInUse' })
    setPermission(result)
  }

  const requestPermission = async () => {
    const result = await RNLocation.requestPermission({ ios: 'whenInUse' });
    setPermission(result)
  }

  getLocation = async () => {
    const { longitude, latitude } = await RNLocation.getLatestLocation({ timeout: 60000 })
    setLatitude(latitude)
    setLongitude(longitude)
  }
  
  return (
    <View style={styles.container}>
      <WeatherLocation />
      <CurrentWeather long={longitude} lat={latitude} />
    </View>
  )
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
