import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Current from '@views/Current'
import AddCity from '@views/AddCity'

const navigation = createStackNavigator({
  Current, AddCity,
}, {
  defaultNavigationOptions: {
    header: null,
  },
  initialRouteName: 'Current',
})

export default createAppContainer(navigation)
