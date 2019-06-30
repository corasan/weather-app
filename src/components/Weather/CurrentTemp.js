// @flow
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Text from '../Text'
import { API_URL, OWM_API } from '../../../config'
import { fahrenheitToCelsius, celsiusToFahrenheit } from '../../utils'
import UnitButton from './UnitButton'

type Props = {
  temp: number,
}

function CurrentTemp({ temp }: Props) {
  const [isFahrenheit, setIsFahrenheit] = useState(true)

  const toggleUnit = () => {
    setIsFahrenheit(!isFahrenheit)
  }

  const converted = isFahrenheit ? temp : fahrenheitToCelsius(temp)

  return (
    <View style={styles.container}>
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
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
  },
  temp: {
    fontSize: 48,
  },
  btnContainers: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
    height: 30,
  },
  line: {
    height: '60%',
    width: 1,
    backgroundColor: 'black',
    marginLeft: 10,
    marginRight: 8
  }
})

export default CurrentTemp
