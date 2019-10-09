import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

export default function useSaveCityLocal(city) {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    async function getCities() {
      try {
        const res = await AsyncStorage.getItem('CloudMate:SavedCities')

        if (res !== null) {
          setCities(JSON.parse(res))
        }
      } catch (err) {
        console.log(err);
      }
    }

    getCities()
  }, [])
  return cities
}
