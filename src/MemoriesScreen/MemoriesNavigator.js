import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableWithoutFeedback} from 'react-native';
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
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('AddMemory')}>
          <View>
            <Text style={{color: '#007AFF', fontWeight: '300', fontSize: 38, marginRight: 13, marginBottom: 9}}>+</Text>
          </View>
      </TouchableWithoutFeedback>
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
