// @flow
import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { NativeModules, NativeEventEmitter } from 'react-native'
import Text from '../Text'

const { RNClock } = NativeModules
const ClockEvents = new NativeEventEmitter(RNClock)

type Props = {
  city: string,
}

function WeatherLocation({ city }: Props) {
  const [time, setTime] = useState('')
  const [day, setDay] = useState('')
  
  useEffect(() => {
    RNClock.initClock()
    
    const clock = ClockEvents.addListener('onTimeChange', ({ currentTime, day }) => {
      setTime(currentTime)
      setDay(day)
    })

    return function cleanup() {
      clock.remove()
    }
  })
  
  return (
    <View style={{ width: '100%' }}>
      <Text style={styles.city}>{city}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.day}>{day}</Text>
        <Text style={[styles.day, { marginLeft: 10 }]}>{time}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  city: {
    fontSize: 26,
  },
  day: {
    fontSize: 18,
    opacity: 0.8,
  },
})

export default WeatherLocation
