import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import MemoriesScreen from './MemoriesScreen.js';
import AddMemoryScreen from './AddMemoryScreen.js'
import MemoryDetailScreen from './MemoryDetailScreen.js'


const RootNavigator = StackNavigator({
  Memories: {
    screen: MemoriesScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: 'Memories',
      headerRight: 
      <TouchableHighlight underlayColor='rgba(200,200,200,0.8)'
        onPress={() => navigation.navigate('AddMemory')}>
        <Text style={{color: '#007AFF', fontWeight: '300', fontSize: 38, marginRight: 13, marginBottom: 9}}>+</Text>
      </TouchableHighlight>
    }),
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
