/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @flow
 */

import React, { Component, useState, useEffect, useCallback } from 'react'
import { Platform, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import RNLocation from 'react-native-location'
import CurrentTemp from '@components/Weather/CurrentTemp'
import WeatherLocation from '@components/Weather/WeatherLocation'
import Forecast from '@components/Weather/Forecast';
import codePush from 'react-native-code-push';
import { getWeatherByLocation, getForecastByLocation } from './src/api'

function App() {
  const [permission, setPermission] = useState(false)
  const [longitude, setLongitude] = useState(0)
  const [latitude, setLatitude] = useState(0)
  const [tempInfo, setTempInfo] = useState(null)
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState({})
  const [forecast, setForecast] = useState([])

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
      setCurrentLocation()
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

  const setCurrentLocation = async () => {
    const { longitude, latitude } = await RNLocation.getLatestLocation({ timeout: 60000 })
    setLatitude(latitude)
    setLongitude(longitude)
  }

  useEffect(() => {
    const getWeather = async (lat, long) => {
      const { main, name, weather, wind, sys } = await getWeatherByLocation(latitude, longitude)
      const { list } = await getForecastByLocation(latitude, longitude)
      setTempInfo(main)
      setCity(name)
      setWeather(weather[0])
      setForecast(list)
    }
    
    getWeather()
  }, [latitude, longitude])

  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <WeatherLocation city={city} />
        {/* $FlowFixMe */}
        <CurrentTemp temp={tempInfo?.temp.toFixed(0)} weather={weather} />

        <Forecast data={forecast} />
      </View>
    </SafeAreaView>
  )
}

export default codePush(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 30,
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
