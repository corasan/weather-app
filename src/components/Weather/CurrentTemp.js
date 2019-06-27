// @flow
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Text from '../Text'
import { API_URL, OWM_API } from '../../../config'
import { getWeatherByLocation } from '../../api'
import { fahrenheitToCelsius, celsiusToFahrenheit } from '../../utilities'

type Props = {
  long: number,
  lat: number,
}

function CurrentTemp({ long, lat }: Props) {
  const [temp, setTemp] = useState('')
  const [isFahrenheit, setIsFahrenheit] = useState(true)

  const getWeather = async () => {
    const res = await getWeatherByLocation(lat, long)
    const { main } = res
    setTemp(main.temp.toFixed(0))
  }

  useEffect(() => {
    if (lat && long) {
      getWeather()
    }
  }, [long, lat])

  const toggleUnit = () => {
    if (isFahrenheit) {
      setTemp(fahrenheitToCelsius(temp))
      setIsFahrenheit(false)
    } else {
      setTemp(celsiusToFahrenheit(temp))
      setIsFahrenheit(true)
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.temp}>{temp}</Text>
        <View style={styles.btnContainers}>
          <TouchableOpacity
            onPress={toggleUnit}
            disabled={isFahrenheit}
            style={{ opacity: isFahrenheit ? 0.4 : 1 }}
          >
            <Text style={styles.degreeText}>ºF</Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity
            onPress={toggleUnit}
            disabled={!isFahrenheit}
            style={{ opacity: !isFahrenheit ? 0.4 : 1 }}
          >
            <Text style={styles.degreeText}>ºC</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  temp: {
    fontSize: 38,
  },
  degreeText: {
    fontSize: 20
  },
  btnContainers: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
    height: 30,
  },
  line: {
    height: '75%',
    width: 1,
    backgroundColor: 'black',
    marginLeft: 10,
    marginRight: 8
  }
})

export default CurrentTemp
