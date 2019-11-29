// @flow
import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import Text from './Text'

type Props = {
  name: string,
  description: string
}

export default function({ name, description }: Props) {
  const uri = `https://openweathermap.org/img/wn/${name}@2x.png`
  return (
    <View style={styles.center}>
      <Image source={{ uri }} style={{ height: 95, width: 95 }} />
      <Text style={styles.description}>{description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
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
