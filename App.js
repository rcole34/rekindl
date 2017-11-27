import React from 'react';
import { View, Text } from 'react-native';
import { TabNavigator } from 'react-navigation'; 
import HomeScreen from "./src/HomeScreen/HomeScreen.js";
import MemoriesScreen from "./src/MemoriesScreen/MemoriesScreen.js";
import ProfileScreen from "./src/ProfileScreen/ProfileScreen.js";
import SettingsScreen from "./src/SettingsScreen/SettingsScreen.js";


const RootTabs = TabNavigator({
  Home: {
    screen: HomeScreen
  },
  Memories: {
    screen: MemoriesScreen,
  },
  Profile: {
    screen: ProfileScreen,
  },
  Settings: {
    screen: SettingsScreen,
  },
});

export default RootTabs;