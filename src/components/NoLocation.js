import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import Text from '@components/Text'
import assets from '@assets'

const NoLocation = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Please enable location services</Text>
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
