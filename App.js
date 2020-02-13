

import React, {Component} from "react";
import { View, Text, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Components
import Screen from './src/Screen';
import Engineer from './src/Engineer';
import Company from './src/Company';

import {Root} from "native-base";
import {Provider} from "react-redux";
import store from "./src/Redux/store";

const Navigator = createStackNavigator({
    Screen: { screen: Screen, navigationOptions:{
        headerShown: false
    }},
    Engineer: { screen: Engineer,navigationOptions:{
        headerShown: false
    }},
    Company: { screen: Company,navigationOptions:{
        headerShown: false
    }}
});

const Navigasi = createAppContainer(Navigator);

export default class App extends Component {
    render() {
      return (
        <Root>
          <Provider store={store}>
            <Navigasi/>
          </Provider>
        </Root>
      )
    }
  };