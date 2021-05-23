import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import TransactionScreen from './Screens/TransactionScreen';
import SearchScreen from './Screens/SearchScreen';

export default class App extends React.Component {
  render() {
    return(
      <AppContainer/>
    )
  }
}

const tabNavigator = createBottomTabNavigator({
  Transaction: {screen: TransactionScreen},
  Search : {screen: SearchScreen}
})

const AppContainer = createAppContainer(tabNavigator)