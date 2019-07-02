import React, { useEffect } from 'react'
import { View, FlatList } from 'react-native'
import Text from '../Text'

function Forecast({ data }) {
  const renderForecast = ({ main }) => (
    <Text>{main?.temp}</Text>
  )

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => renderForecast(item)}
    />
  )
}

export default Forecast
