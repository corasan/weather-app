import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Switch } from 'react-native'
import Text from '@components/Text'
import { useAppContext } from '@hooks'

function AddCity() {
  // const [locationService, setLocationService] = useState()
  const { permission } = useAppContext()
  console.log(permission);

  // useEffect(() => {

  // })

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>AddCity</Text>

    </SafeAreaView>
  )
}

export default AddCity
