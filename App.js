/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @flow
 */

import React, { Component, useState, useEffect } from 'react'
import { Platform, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import RNLocation from 'react-native-location'
import CurrentTemp from '@components/Weather/CurrentTemp'
import WeatherLocation from '@components/Weather/WeatherLocation'
import { getWeatherByLocation } from './src/api'

export default function App() {
  const [permission, setPermission] = useState(false)
  const [longitude, setLongitude] = useState(0)
  const [latitude, setLatitude] = useState(0)
  const [tempInfo, setTempInfo] = useState(null)
  const [city, setCity] = useState('')

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
      getWeather()
    }
  }, [permission])

  const checkPermission = async () => {
    const result = await RNLocation.checkPermission({ ios: 'whenInUse' })
    setPermission(result)
  }

  const requestPermission = async () => {
    const result = await RNLocation.requestPermission({ ios: 'whenInUse' });
    setPermission(result)
  }

  const getWeather = async () => {
    const { longitude, latitude } = await RNLocation.getLatestLocation({ timeout: 60000 })
    const { main, name, weahter, wind, sys } = await getWeatherByLocation(latitude, longitude)
    setTempInfo(main)
    setCity(name)
  }
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <WeatherLocation city={city} />
        {/* $FlowFixMe */}
        <CurrentTemp temp={tempInfo?.temp.toFixed(0)} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
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
