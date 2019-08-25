import { createStackNavigator, createAppContainer } from 'react-navigation'
import Main from '@views/Main'
import Settings from '@views/Settings'

const navigation = createStackNavigator({
  Main, Settings,
}, {
  defaultNavigationOptions: {
    header: null,
  },
  initialRouteName: 'Main',
})

export default createAppContainer(navigation)
