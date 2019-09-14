import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
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
