import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import MemoriesScreen from './MemoriesScreen.js';
import AddMemoryScreen from './AddMemoryScreen.js'
import MemoryDetailScreen from './MemoryDetailScreen.js'


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

  MemoryDetail: {
    screen: MemoryDetailScreen,
    navigationOptions: ({navigation}) => ({
      title: "Change Me"
    }),
  },
});

export default RootNavigator;
