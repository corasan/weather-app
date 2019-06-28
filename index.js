/**
 * @format
 */

import React from 'react'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

class CloudMate extends React.Component {
  render() {
    return <App />
  }
}

AppRegistry.registerComponent(appName, () => CloudMate);
