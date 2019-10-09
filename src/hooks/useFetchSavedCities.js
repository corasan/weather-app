import { useState, useEffect } from 'react'
import { getItem } from '@react-native-community/async-storage'

export default async function useSaveCityLocal(city) {
  const [cities, setCities] = useState(null);

  useEffect(() => {
    async function getCities() {
      try {
        const res = await getItem('SaveCities')
        setCities(res)
      } catch (err) {
        console.log(err);
      }
    }

    getCities()
  }, [])

  return cities
}
