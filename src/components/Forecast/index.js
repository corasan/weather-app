import React, { useEffect, useState, useContext } from 'react'
import { FlatList } from 'react-native'
import moment from 'moment'
import { map, filter, groupBy, flatMap } from 'lodash'
import { ForecastType } from 'propTypes/weatherTypes'
import ForecastItem from './ForecastItem'
import Context from '../../context'

type Props = { data: [] }

function Forecast({ data }: Props): React$Element<any> {
  const [days, setDays] = useState([])
  const { setTodayMinMax } = useContext(Context)

  const formatDate = (date: string) => moment(date).format('dddd')

  useEffect(() => {
    const x = groupBy(data, ({ dt_txt }) => formatDate(dt_txt))
    const y = flatMap(x, (item, i) => {
      const a = map(item, ({ main }: ForecastType): number => main.temp_max)
      return filter(item, ({ main }: ForecastType) => main.temp_max === Math.max(...a))
    })
    setDays(y)
    setTodayMinMax(y[0])
  }, [data, setTodayMinMax])

  return (
    <FlatList
      data={days}
      renderItem={({ item }) => <ForecastItem {...item} />}
      keyExtractor={(item, key) => key.toString()}
      horizontal
      style={{ bottom: 0, position: 'absolute', paddingBottom: 20 }}
      showsHorizontalScrollIndicator={false}
    />
  )
}

export default Forecast
