import React, { useState, useEffect } from 'react'
import { StatusBar } from 'react-native'
import RNLocation from 'react-native-location'
import codePush from 'react-native-code-push'
import Analytics from 'appcenter-analytics'
import admob from '@react-native-firebase/admob'
import { useAsyncStorage } from '@react-native-community/async-storage'
import Navigation from './src/navigation'

import { getWeatherByLocation, getDailyForecastByLocation, getWeatherByCity } from './src/api'
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
	const [savedCities, setSavedCities] = useState([])
	const { getItem } = useAsyncStorage('@CloudMate:saved_cities')

	useEffect(() => {
		const permissionUpdate = RNLocation.subscribeToPermissionUpdates(
			handlePermissionUpdate,
		)

		async function fetchCitiesFromLocal() {
			const cities = await getItem()
			if (cities !== null) {
				const theCities = JSON.parse(cities)
				setSavedCities(theCities)

				if (!permission) {
					const { lat, lon } = theCities[0]?.coord
					changeLocation(lat, lon)
				}
			} else {
				const nyc = await getWeatherByCity('New York')
				changeLocation(nyc?.coord?.lat, nyc?.coord?.lon)
			}
		}
		admob()
		checkPermission()
		fetchCitiesFromLocal()
		StatusBar.setBarStyle('dark-content')

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

	const changeLocation = async (lat: number, long: number) => {
		console.log('change location', lat, long)
		setLatitude(lat)
		setLongitude(long)
	}

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
		changeLocation,
		setCurrentLocation,
		savedCities,
		setSavedCities,
	}

	return (
		<Context.Provider value={context}>
			<Navigation />
		</Context.Provider>
	)
}

const CloudMate = __DEV__ ? App : codePush(App)

export default CloudMate
