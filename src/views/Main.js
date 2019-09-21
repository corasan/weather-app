import React from 'react'
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native'
import CurrentTemp from '@components/CurrentWeather/CurrentTemp'
import WeatherLocation from '@components/CurrentWeather/WeatherLocation'
import Forecast from '@components/Forecast'
import NoLocation from '@components/NoLocation'
import WeatherDetails from '@components/WeatherDetails'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob'

import { useAppContext, useNavigation } from '@hooks'
import { AD_UNIT } from '../constants'

// const { MobileAd } = admob

function Main() {
  const {
    permission,
    longitude,
    latitude,
    city,
    weather,
    details,
    forecast,
  } = useAppContext()
  const { navigate } = useNavigation()
  const unitId = __DEV__ ? TestIds.BANNER : AD_UNIT

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {permission && (longitude && latitude) ? (
        <View style={styles.container}>
          <TouchableOpacity style={styles.settingsBtn} activeOpacity={0.5} onPress={() => navigate('Settings')}>
            <AntDesign name="plus" size={25} color="#b8b8b8" />
          </TouchableOpacity>
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

      {/* <MobileAd adUnitId={AD_UNIT} /> */}
      <BannerAd
        unitId={unitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => {
          console.log('Advert loaded');
        }}
        onAdFailedToLoad={error => {
          console.error('Advert failed to load: ', error);
        }}
      />
    </SafeAreaView>
  )
}

export default Main

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
  settingsBtn: {
    position: 'absolute',
    top: 0,
    right: 10,
    padding: 6,
  },
})
