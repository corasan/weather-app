import { useContext } from 'react'
import { NavigationContext } from 'react-navigation'

export default function() {
  return useContext(NavigationContext);
}
