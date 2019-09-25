import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { BannerAd, TestIds, BannerAdSize } from '@react-native-firebase/admob'
import AddCity from './AddCity'
import { useAppContext, useNavigation } from '@hooks'
import { AD_UNIT } from '../constants'
import {
	CurrentTemp,
	Forecast,
	NoLocation,
	WeatherLocation,
	WeatherDetails,
} from '@components'

export default function Current() {
	const {
		permission,
		longitude,
		latitude,
		city,
		weather,
		details,
		forecast,
	} = useAppContext()
	const [addCityVisible, setAddCityVisible] = useState(false)
	const unitId = __DEV__ ? TestIds.BANNER : AD_UNIT

	const renderTopBar = () => (
		<View style={styles.topBar}>
			<View />
			<TouchableOpacity
				style={styles.settingsBtn}
				activeOpacity={0.5}
				onPress={() => setAddCityVisible(true)}
			>
				<AntDesign name="plus" size={25} color="#b8b8b8" />
			</TouchableOpacity>
		</View>
	)

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{permission && (longitude && latitude) ? (
				<View style={styles.container}>
					{renderTopBar()}
					<WeatherLocation city={city} />
					<CurrentTemp weather={weather} />
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
				onAdLoaded={() => {
					console.log('Advert loaded')
				}}
				onAdFailedToLoad={error => {
					console.error('Advert failed to load: ', error)
				}}
			/>
		</SafeAreaView>
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
	},
})
