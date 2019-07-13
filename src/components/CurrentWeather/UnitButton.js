import React from 'react'
import { TouchableOpacity } from 'react-native'
import Text from '../Text'

const UnitButton = ({ toggleUnit, disabled, unit }) => (
  <TouchableOpacity
    onPress={toggleUnit}
    disabled={disabled}
    style={{ opacity: disabled ? 0.4 : 1 }}
  >
    <Text style={{ fontSize: 22 }}>{`º${unit}`}</Text>
  </TouchableOpacity>
)

export default UnitButton
