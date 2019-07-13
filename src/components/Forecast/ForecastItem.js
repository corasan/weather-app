import React, { useContext } from 'react'
import { View, Image } from 'react-native'
import Text from '../Text'
import Context from '../../context'
import { fahrenheitToCelsius, formatDate } from '../../utils'
import { ForecastType } from '../../weatherTypes'


function ForecastItem({ main, dt_txt, weather }: ForecastType): React$Element<any> {
  const { isFahrenheit } = useContext(Context)
  const { icon } = weather[0]
  const temp_max = main?.temp_max
  const uri = `https://openweathermap.org/img/wn/${icon}@2x.png`

  const temp = isFahrenheit ? temp_max : fahrenheitToCelsius(temp_max)
  const unit = isFahrenheit ? 'F' : 'C'

  return (
    <View style={{ marginHorizontal: 10, alignItems: 'center' }}>
      <Image source={{ uri }} style={{ height: 40, width: 40 }} />
      <Text style={{ fontSize: 14 }}>{formatDate(dt_txt)}</Text>
      <Text style={{ fontSize: 16 }}>{`${temp.toFixed(0)} º${unit}`}</Text>
    </View>
  )
}

export default ForecastItem
