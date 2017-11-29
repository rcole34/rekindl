import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import ProfileScreen from './ProfileScreen.js';
import ScheduleScreen from './ScheduleScreen.js';
import EditProfileScreen from './EditProfileScreen.js'
import MemoriesScreen from '../MemoriesScreen/MemoriesScreen.js'

const RootNavigator = StackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      headerTitle: 'Profile',
    },
  },
  Schedule: {
    screen: ScheduleScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Schedule',
    }),
  },
  EditProfile: {
    screen: EditProfileScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Edit Profile',
    }),
  },
  Memories: {
    screen: MemoriesScreen,
    navigationOptions: ({navigation}) => ({
      title: 'All Memories',
    }),
  },
});

export default RootNavigator;
