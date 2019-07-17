// @flow
import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import Text from '@components/Text'
import assets from '@assets'

type Props = {
  permission: boolean,
  latitude: number,
  longitude: number,
}

const setText = ({ permission, latitude, longitude }: Props): string => {
  if (!permission && longitude && latitude) {
    return 'Please enable your location'
  } else if (permission && !longitude && !latitude) {
    return "Couldn't get your location"
  }
  return 'Please enable your location'
}

const NoLocation = (props: Props): React$Element<any> => (
  <View style={styles.container}>
    <Text style={styles.text}>{setText(props)}</Text>
    <Image source={assets.sad} style={{ resizeMode: 'contain', height: 60 }} />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 50,
    color: '#C0C0C0',
  },
})

export default NoLocation
