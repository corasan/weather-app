import React from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

type Props = {
  size: number,
  onPress(): void,
}

export default function({ size = 24, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 4, borderRadius: 100 }}>
      <View style={{ padding: size + 4 }}>
        <AntDesign size={size} name="close" />
      </View>
    </TouchableOpacity>
  )
}
