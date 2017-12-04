import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import MemoriesScreen from './MemoriesScreen.js';
import AddMemoryScreen from './AddMemoryScreen.js'

const RootNavigator = StackNavigator({
  Memories: {
    screen: MemoriesScreen,
    navigationOptions: {
      headerTitle: 'Memories',
    },
  },

  AddMemory: {
    screen: AddMemoryScreen,
    navigationOptions: ({navigation}) => ({
      title: "Add Memory",
    }),
  },
});

export default RootNavigator;
