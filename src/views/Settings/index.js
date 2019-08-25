import React from 'react'
import { View, SafeAreaView } from 'react-native'
import Text from '@components/Text'
import UnitSetting from './UnitSetting'

function Settings() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Settings</Text>

      <UnitSetting />
    </SafeAreaView>
  )
}

export default Settings
