// @flow
import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import Text from 'components/Text'
import Context from '../context'
import { fahrenheitToCelsius } from '../utils'

const DetailItem = ({ value, label }: { value: number | string, label: string }) => (
  <View style={styles.thing}>
    <Text>{label}</Text>
    <Text style={{ marginTop: 5 }}>{value}</Text>
  </View>
)

type DetailsType = {
  temp_max: number,
  humidity: number,
  pressure: number,
  temp_min: number,
}

function WeatherDetails({ details }: { details: DetailsType }) {
  const { isFahrenheit, todayMinMax } = useContext(Context)
  const { humidity, pressure, temp_min: min } = details
  const { temp_max: max } = todayMinMax.main
  const maxTemp = isFahrenheit ? max : fahrenheitToCelsius(max)
  const minTemp = isFahrenheit ? min : fahrenheitToCelsius(min)
  const unit = isFahrenheit ? 'ºF' : 'ºC'
  const maxTempText = `${maxTemp.toFixed(0)} ${unit}`
  const minTempText = `${minTemp.toFixed(0)} ${unit}`

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <DetailItem value={maxTempText} label="Max temp" />
        <DetailItem value={minTempText} label="Min temp" />
      </View>
      <View style={styles.row}>
        <DetailItem value={`${humidity}%`} label="Humidity" />
        <DetailItem value={`${pressure} HPA`} label="Pressure" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  container: {
    width: '100%',
  },
  thing: {
    alignItems: 'center',
    flex: 0.5,
  },
})

export default WeatherDetails
