// @flow
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { API_URL, OWM_API } from '../../config'
import { getWeatherByLocation } from '../api'

type Props = {
  long: number,
  lat: number,
}

function CurrentWeather({ long, lat }: Props) {
  const [temp, setTemp] = useState('')

  const getWeather = async () => {
    const { main } = await getWeatherByLocation(lat, long)
    setTemp(main.temp)
  }

  useEffect(() => {
    if (lat && long) {
      getWeather()
    }
  }, [long, lat])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{temp}</Text>
    </View>
  )
}

export default CurrentWeather
