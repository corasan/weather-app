import React, { useEffect, useState } from 'react'
import { View, FlatList } from 'react-native'
import Text from '../Text'
import moment from 'moment'
import { map, filter, groupBy, flatMap } from 'lodash'

function Forecast({ data }) {
  const [days, setDays] = useState([])

  const formatDate = (date) => moment(date).format('dddd')

  useEffect(() => {
    const x = groupBy(data, ({ dt_txt }) => formatDate(dt_txt))
    const y = flatMap(x, (item, i) => {
      const a = map(item, el => el.main.temp_max)
      return filter(item, el => el.main.temp_max === Math.max(...a))
    })
    setDays(y)
  }, [data])

  console.log(days)
  const renderForecast = ({ main, dt_txt }) => {
    return (
      <View>
        <Text>{formatDate(dt_txt)}</Text>
        <Text>{main?.temp_max}</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={days}
      renderItem={({ item }) => renderForecast(item)}
      keyExtractor={(item, key) => key.toString()}
    />
  )
}

export default Forecast
