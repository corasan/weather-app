import React, { useState, useEffect } from 'react'
import RNLocation from 'react-native-location'
import codePush from 'react-native-code-push'
import Analytics from 'appcenter-analytics'
import admob from '@react-native-firebase/admob'
import Navigation from './src/navigation'

import { getWeatherByLocation, getDailyForecastByLocation } from './src/api'
import Context from './src/context'

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
		const permissionUpdate = RNLocation.subscribeToPermissionUpdates(
			handlePermissionUpdate,
		)
		admob()
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
		const result = await RNLocation.requestPermission({ ios: 'whenInUse' })
		setPermission(result)
	}

	const setCurrentLocation = async () => {
		const {
			longitude: long,
			latitude: lat,
		} = await RNLocation.getLatestLocation({ timeout: 60000 })
		setLatitude(lat)
		setLongitude(long)
	}

	useEffect(() => {
		const getWeather = async () => {
			const { main, name, weather: w } = await getWeatherByLocation(
				latitude,
				longitude,
			)
			const { list } = await getDailyForecastByLocation(latitude, longitude)
			setTemp(main?.temp)
			setCity(name)
			setWeather(w[0])
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
		temp,
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

const CloudMate = __DEV__ ? App : codePush(App)

export default CloudMate
