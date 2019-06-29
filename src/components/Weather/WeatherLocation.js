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
  const currentDate = new Date()
  const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(currentDate)
  const [time, setTime] = useState('')
  
  useEffect(() => {
    RNClock.initClock()
    
    const clock = ClockEvents.addListener('onTimeChange', ({ currentTime }) => {
      setTime(currentTime)
    })

    return function cleanup() {
      clock.remove()
    }
  })
  
  return (
    <View>
      <Text>{city}</Text>
      <Text>{time}</Text>
    </View>
  )
}

export default WeatherLocation
