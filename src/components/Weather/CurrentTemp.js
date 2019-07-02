// @flow
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Text from '../Text'
import { API_URL, OWM_API } from '../../../config'
import { fahrenheitToCelsius, celsiusToFahrenheit } from '../../utils'
import UnitButton from './UnitButton'

type Weather = {
  icon: string,
  description: string,
}

type Props = {
  temp: number,
  weather: Weather,
}

function CurrentTemp({ temp, weather }: Props) {
  const [isFahrenheit, setIsFahrenheit] = useState(true)
  const { icon, main }: Weather = weather
  const uri = `https://openweathermap.org/img/wn/${icon}@2x.png`

  const toggleUnit = () => {
    setIsFahrenheit(!isFahrenheit)
  }

  const converted = isFahrenheit ? temp : fahrenheitToCelsius(temp)

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
        <View style={styles.center}>
          <Image source={{ uri }} style={{ height: 95, width: 95 }} />
          <Text style={styles.description}>{main}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.temp}>{converted}</Text>
          <View style={styles.btnContainers}>
            <UnitButton
              toggleUnit={toggleUnit}
              disabled={isFahrenheit}
              unit="F"
            />
            <View style={styles.line} />
            <UnitButton
              toggleUnit={toggleUnit}
              disabled={!isFahrenheit}
              unit="C"
            />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    width: '100%',
  },
  temp: {
    fontSize: 72,
  },
  btnContainers: {
    flexDirection: 'row',
    marginLeft: 12,
    alignItems: 'center',
    height: 30,
    marginTop: 10,
  },
  line: {
    height: '70%',
    width: 1,
    backgroundColor: 'black',
    marginLeft: 10,
    marginRight: 8
  },
  description: {
    fontSize: 12,
    letterSpacing: 0.5,
    marginTop: -15,
    opacity: 0.5,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    marginTop: -10
  },
})

export default CurrentTemp
