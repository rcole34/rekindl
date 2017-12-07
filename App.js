import React from 'react';
import { View, Text, Image } from 'react-native';
import { TabNavigator } from 'react-navigation'; 
import HomeNavigator from "./src/HomeScreen/HomeNavigator.js";
import MemoriesScreen from "./src/MemoriesScreen/MemoriesScreen.js";
import ProfileNavigator from "./src/ProfileScreen/ProfileNavigator.js";
import SettingsScreen from "./src/SettingsScreen/SettingsScreen.js";
import MemoriesNavigator from "./src/MemoriesScreen/MemoriesNavigator.js";
import Friends from "./data.js"

console.log(Friends)


const RootTabs = TabNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => {
        return <Image
          source={require('./assets/icons/home.png')}
          style={[{width: 26, height: 26}, {tintColor: tintColor}]}
        />
      },
    },
  },
  Memories: {
    screen: MemoriesNavigator,
    navigationOptions: {
      tabBarLabel: 'Memories',
      tabBarIcon: ({ tintColor }) => {
        return <Image
          source={require('./assets/icons/memories.png')}
          style={[{width: 26, height: 26}, {tintColor: tintColor}]}
        />
      },
    },
  },
  Profile: {
    screen: ProfileNavigator,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => {
        return <Image
          source={require('./assets/icons/profile.png')}
          style={[{width: 26, height: 26}, {tintColor: tintColor}]}
        />
      },
    },
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => {
        return <Image
          source={require('./assets/icons/settings.png')}
          style={[{width: 26, height: 26}, {tintColor: tintColor}]}
        />
      },
    },
  },
});

export default RootTabs;