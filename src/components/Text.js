import React from 'react'
import { Text as RNText, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Futura',
    fontSize: 18,
    letterSpacing: 0.5,
  },
})

const Text = (props) => {
  const { children, style } = props

  return <RNText {...props} style={[styles.text, style]}>{children}</RNText>
}

export default Text
