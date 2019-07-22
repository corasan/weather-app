import React, { useState, useEffect } from 'react'
import RNLocation from 'react-native-location'
import codePush from 'react-native-code-push'
import Analytics from 'appcenter-analytics'
import firebase from 'react-native-firebase'
import Navigation from './src/navigation'

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
  const [details, setDetails] = useState(null)
  const [todayMinMax, setTodayMinMax] = useState()

  useEffect(() => {
    const permissionUpdate = RNLocation.subscribeToPermissionUpdates(handlePermissionUpdate)
    firebase.admob().initialize('ca-app-pub-6893917161539964~3285985267')
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
      console.log(permission)
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
      setDetails(main)
      Analytics.trackEvent('Weather requested', { City: name })
    }

    if (latitude && longitude) {
      getWeather()
    }
  }, [latitude, longitude])

  const toggleUnit = () => {
    setIsFahrenheit(!isFahrenheit)
  }

  const context = {
    toggleUnit,
    temp: isFahrenheit ? temp : fahrenheitToCelsius(temp),
    isFahrenheit,
    details,
    setTodayMinMax,
    todayMinMax,
    weather,
    city,
    forecast,
    latitude,
    longitude,
    permission,
  }

  return (
    <Context.Provider value={context}>
      <Navigation />
    </Context.Provider>
  )
}

export default codePush(App)
