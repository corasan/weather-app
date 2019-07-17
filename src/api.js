// @flow
import { API_URL, OWM_API } from '../config'

function get(query: string, apiEndpoint: string = 'weather') {
  return fetch(`${API_URL}/${apiEndpoint}?${query}&units=imperial&APPID=${OWM_API}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
}

export async function getWeatherByLocation(lat: number, long: number) {
  const res = await get(`lat=${lat}&lon=${long}`)
  const resObj = await res.json()
  return resObj
}

export async function getDailyForecastByLocation(lat: number, long: number) {
  const res = await get(`lat=${lat}&lon=${long}`, 'forecast')
  const resObj = await  res.json()
  return resObj
}
