import { createStackNavigator, createAppContainer } from 'react-navigation'
import Main from '@views/Main'

const navigation = createStackNavigator({
  Main: {
    screen: Main,
  },
}, {
  defaultNavigationOptions: {
    header: null,
  },
})

export default createAppContainer(navigation)
