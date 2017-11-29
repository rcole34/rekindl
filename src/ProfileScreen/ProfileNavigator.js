import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import ProfileScreen from './ProfileScreen.js';
import CalendarScreen from './CalendarScreen.js';
import EditProfileScreen from './EditProfileScreen.js'
import MemoriesScreen from '../MemoriesScreen/MemoriesScreen.js'

const RootNavigator = StackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      headerTitle: 'Profile'
    },
  },
  Calendar: {
    screen: CalendarScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Calendar'
    }),
  },
  EditProfile: {
    screen: EditProfileScreen,
    navigationOptions: {
      title: 'Edit Profile'
    },
  },
  Memories: {
    screen: MemoriesScreen,
    navigationOptions: {
      title: 'All Memories'
    }
  }
});

export default RootNavigator;
