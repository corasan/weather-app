import React, { useState, useEffect } from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import RNLocation from 'react-native-location'
import CurrentTemp from '@components/CurrentWeather/CurrentTemp'
import WeatherLocation from '@components/CurrentWeather/WeatherLocation'
import Forecast from '@components/Forecast'
import NoLocation from '@components/NoLocation'
import codePush from 'react-native-code-push'

import { getWeatherByLocation, getDailyForecastByLocation } from './src/api'
import Context from './src/context'
import { fahrenheitToCelsius } from './src/utils'

function App() {
  const [permission, setPermission] = useState(false)
  const [longitude, setLongitude] = useState(0)
  const [latitude, setLatitude] = useState(0)
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState({})
  const [forecast, setForecast] = useState([])
  const [isFahrenheit, setIsFahrenheit] = useState(true)
  const [temp, setTemp] = useState(0)

  useEffect(() => {
    const permissionUpdate = RNLocation.subscribeToPermissionUpdates(handlePermissionUpdate)
    checkPermission()

    return function cleanup() {
      permissionUpdate()
    }
  }, [])

  const handlePermissionUpdate = (authorization: string) => {
    if (authorization === 'authorizedWhenInUse') {
      setPermission(true)
    } else {
      setPermission(false)
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
    const { longitude: long, latitude: lat } = await RNLocation.getLatestLocation({ timeout: 60000 })
    setLatitude(lat)
    setLongitude(long)
  }

  useEffect(() => {
    const getWeather = async () => {
      const { main, name, weather: weath } = await getWeatherByLocation(latitude, longitude)
      const { list } = await getDailyForecastByLocation(latitude, longitude)
      setTemp(main?.temp)
      setCity(name)
      setWeather(weath[0])
      setForecast(list)
    }

    getWeather()
  }, [latitude, longitude])

  const toggleUnit = () => {
    setIsFahrenheit(!isFahrenheit)
  }

  const context = {
    toggleUnit,
    temp: isFahrenheit ? temp : fahrenheitToCelsius(temp),
    isFahrenheit,
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {permission ? (
        <Context.Provider value={context}>
          <View style={styles.container}>
            <WeatherLocation city={city} />
            <CurrentTemp weather={weather} />

            <Forecast data={forecast} />
          </View>
        </Context.Provider>
      ) : <NoLocation />
      }
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
