// @flow
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

type Props = {
  city: string,
}

function WeatherLocation({ city }: Props) {
  const currentDate = new Date()
  const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(currentDate)

  return (
    <View>
      <Text>{city}</Text>
    </View>
  )
}

export default WeatherLocation
