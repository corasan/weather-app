export type MainWeather = {
  temp_max: number
}

export type Weather = {
  icon: string,
}

export type ForecastType = {
  main: MainWeather,
  dt_txt: string,
  weather: [Weather],
}
