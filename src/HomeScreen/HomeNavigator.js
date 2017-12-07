import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import HomeScreen from './HomeScreen.js';
import DetailScreen from './DetailScreen.js';
import AddFriendScreen from './AddFriendScreen.js';
import ScheduleScreen from '../ScheduleScreen/ScheduleScreen.js';
import AddFriendInfoScreen from './AddFriendInfoScreen.js';

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: 'Home',
    }),
  },
  Detail: {
    screen: DetailScreen,
  },
  AddFriend: {
    screen: AddFriendScreen,
    navigationOptions: ({navigation}) => ({
      title: "Add Connection",
    }),
  },
  Schedule: {
    screen: ScheduleScreen,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.name + "'s Schedule",
    }),
  },
  AddFriendInfo: {
    screen: AddFriendInfoScreen,
    navigationOptions: ({navigation}) => ({
      title: "Enter Information",
    }),
  },
});

export default RootNavigator;
