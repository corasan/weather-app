import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { BannerAd, TestIds, BannerAdSize } from '@react-native-firebase/admob'
import { useAsyncStorage } from '@react-native-community/async-storage'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'
import { uniqBy } from 'lodash'
import AddCity from './AddCity'
import { useAppContext } from 'hooks'
import { SavedCities } from 'components'
import MenuIcon from 'assets/MenuIcon'
import { AD_UNIT } from '../constants'

import {
	CurrentTemp,
	Forecast,
	NoLocation,
	WeatherLocation,
	WeatherDetails,
} from 'components'

export default function Current() {
	const {
		permission,
		longitude,
		latitude,
		city,
		weather,
		details,
		forecast,
		temp,
		savedCities,
		setSavedCities,
	} = useAppContext()
	const [addCityVisible, setAddCityVisible] = useState(false)
	const unitId = !__DEV__ ? AD_UNIT : TestIds.BANNER
	const { getItem } = useAsyncStorage('@CloudMate:saved_cities')
	const drawer = useRef(null)

	useEffect(() => {
		async function fetchCitiesFromLocal() {
			const cities = await getItem()
			if (cities !== null) {
				setSavedCities(uniqBy(JSON.parse(cities)))
			}
		}

		fetchCitiesFromLocal()
	}, [savedCities])

	const renderTopBar = () => (
		<View style={styles.topBar}>
			<TouchableOpacity activeOpacity={0.5} onPress={() => drawer.current.openDrawer()}>
				<MenuIcon />
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.settingsBtn}
				activeOpacity={0.5}
				onPress={() => setAddCityVisible(true)}
			>
				<AntDesign name="plus" size={25} color="#b8b8b8" />
			</TouchableOpacity>
		</View>
	)

	const renderDrawerView = () => (
		<SavedCities savedCities={savedCities} />
	)

	return (
		<DrawerLayout
			drawerWidth={250}
			drawerPosition={DrawerLayout.positionsLeft}
			drawerType="front"
			drawerBackgroundColor="#fff"
			renderNavigationView={renderDrawerView}
			ref={drawer}
		>
			<SafeAreaView style={{ flex: 1 }}>
				{permission && (longitude && latitude) ? (
					<View style={styles.container}>
						{renderTopBar()}
						<WeatherLocation city={city} />
						<CurrentTemp weather={weather} temp={temp} />
						{details && <WeatherDetails details={details} />}

						<Forecast data={forecast} />
					</View>
				) : (
					<NoLocation
						permission={permission}
						latitude={latitude}
						longitude={longitude}
					/>
				)}

				<AddCity
					close={() => setAddCityVisible(false)}
					visible={addCityVisible}
				/>

				<BannerAd
					unitId={unitId}
					size={BannerAdSize.SMART_BANNER}
					requestOptions={{
						requestNonPersonalizedAdsOnly: true,
					}}
					onAdFailedToLoad={error => {
						console.error('Advert failed to load: ', error)
					}}
				/>
			</SafeAreaView>
		</DrawerLayout>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		paddingHorizontal: '6%',
		paddingTop: 5,
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
	settingsBtn: {
		padding: 3,
	},
	topBar: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
})
