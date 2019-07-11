/**
 * @format
 */

import React from 'react'
import { AppRegistry, YellowBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

YellowBox.ignoreWarnings(['Remote debugger']);

class CloudMate extends React.Component {
  render() {
    return <App />
  }
}

AppRegistry.registerComponent(appName, () => CloudMate);
