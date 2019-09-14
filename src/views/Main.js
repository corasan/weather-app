import React, { useContext } from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import CurrentTemp from '@components/CurrentWeather/CurrentTemp'
import WeatherLocation from '@components/CurrentWeather/WeatherLocation'
import Forecast from '@components/Forecast'
import NoLocation from '@components/NoLocation'
import WeatherDetails from '@components/WeatherDetails'
// import { BannerAd } from '@react-native-firebase/admob'

import Context from '../context'
// import { AD_UNIT } from '../constants'

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
  } = useContext(Context)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {permission && (longitude && latitude) ? (
        <View style={styles.container}>
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
})
