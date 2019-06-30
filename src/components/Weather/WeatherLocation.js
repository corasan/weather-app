// @flow
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NativeModules, NativeEventEmitter } from 'react-native'

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
    <View>
      <Text>{city}</Text>
      <Text>{day}</Text>
      <Text>{time}</Text>
    </View>
  )
}

export default WeatherLocation
