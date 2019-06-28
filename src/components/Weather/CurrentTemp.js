// @flow
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Text from '../Text'
import { API_URL, OWM_API } from '../../../config'
import { fahrenheitToCelsius, celsiusToFahrenheit } from '../../utils'

type Props = {
  temp: number,
}

function CurrentTemp({ temp }: Props) {
  const [unitTemp, setUnit] = useState(0)
  const [isFahrenheit, setIsFahrenheit] = useState(true)

  useEffect(() => {
    setUnit(temp)
  }, [temp])

  const toggleUnit = () => {
    if (isFahrenheit) {
      setUnit(fahrenheitToCelsius(unitTemp))
      setIsFahrenheit(false)
    } else {
      setUnit(celsiusToFahrenheit(unitTemp))
      setIsFahrenheit(true)
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.temp}>{unitTemp}</Text>
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
