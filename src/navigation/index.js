import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Main from '@views/Main'
import AddCity from '@views/AddCity'

const navigation = createStackNavigator({
  Main, AddCity,
}, {
  defaultNavigationOptions: {
    header: null,
  },
  initialRouteName: 'Main',
})

export default createAppContainer(navigation)
