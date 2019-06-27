import { API_URL, OWM_API } from '../config'

function get(query) {
  return fetch(`${API_URL}?${query}&units=imperial&APPID=${OWM_API}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
}

export async function getWeatherByLocation(lat, long) {
  const res = await get(`lat=${lat}&lon=${long}`)
  const resObj = await res.json()
  return resObj
}