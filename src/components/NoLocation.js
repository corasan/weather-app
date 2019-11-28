// @flow
import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native'
import Text from 'components/Text'
import assets from 'assets'

type Props = {
  permission: boolean,
  latitude: number,
  longitude: number,
}

const setText = ({ permission, latitude, longitude }: Props): string => {
  if (!permission && !longitude && !latitude) {
    return 'Please enable your location'
  }
  return "Couldn't get your location"
}

const NoLocation = (props: Props): React$Element<any> => (
  <View style={styles.container}>
    <Text style={styles.text}>{setText(props)}</Text>
    <Image source={assets.sad} style={{ resizeMode: 'contain', height: 60 }} />

    {!props?.permission && (
      <TouchableOpacity style={{ marginTop: 60 }} activeOpacity={0.6} onPress={() => Linking.openURL('app-settings://')}>
        <View style={styles.locationBtn}>
          <Text style={{ color: '#fff', marginBottom: 1 }}>Enable location</Text>
        </View>
      </TouchableOpacity>
    )}
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
  locationBtn: {
    backgroundColor: '#0088f8',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 100,
  },
})

export default NoLocation
