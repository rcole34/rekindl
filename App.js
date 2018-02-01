import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import DetailScreen from './src/HomeScreen/DetailScreen.js';
import HomeScreen from './src/HomeScreen/HomeScreen.js'
import AddFriendScreen from './src/HomeScreen/AddFriendScreen.js';
// import ScheduleScreen from './ScheduleScreen/ScheduleScreen.js';
import AddFriendInfoScreen from './src/HomeScreen/AddFriendInfoScreen.js';
import ProfileScreen from "./src/ProfileScreen/ProfileScreen.js";
import EditProfileScreen from "./src/ProfileScreen/EditProfileScreen.js";

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: 'Home',
      headerLeft: null,
      headerRight: 
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('Profile')}>
          <View>
            <Image source={require('./assets/icons/profile.png')} style={{tintColor: '#007AFF', height: 30, width: 30, marginRight: 20, marginBottom: 5}}/>
          </View>
      </TouchableWithoutFeedback>
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
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Profile',
    }),
  },
  EditProfile: {
    screen: EditProfileScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Edit Profile',
    }),
  },
  // Schedule: {
  //   screen: ScheduleScreen,
  //   navigationOptions: ({navigation}) => ({
  //     title: navigation.state.params.name + "'s Schedule",
  //   }),
  // },
  AddFriendInfo: {
    screen: AddFriendInfoScreen,
    navigationOptions: ({navigation}) => ({
      title: "Enter Information",
    }),
  },
});

export default RootNavigator;


// import React from 'react';
// import { View, Text, Image } from 'react-native';
// import { TabNavigator } from 'react-navigation'; 
// import HomeNavigator from "./src/HomeScreen/HomeNavigator.js";
// import MemoriesScreen from "./src/MemoriesScreen/MemoriesScreen.js";
// import ProfileNavigator from "./src/ProfileScreen/ProfileNavigator.js";
// import SettingsScreen from "./src/SettingsScreen/SettingsScreen.js";
// import MemoriesNavigator from "./src/MemoriesScreen/MemoriesNavigator.js";
// import Friends from "./data.js"

// const RootTabs = TabNavigator({
//   Home: {
//     screen: HomeNavigator,
//     navigationOptions: {
//       tabBarLabel: 'Home',
//       tabBarIcon: ({ tintColor }) => {
//         return <Image
//           source={require('./assets/icons/home.png')}
//           style={[{width: 26, height: 26}, {tintColor: tintColor}]}
//         />
//       },
//     },
//   },
//   Memories: {
//     screen: MemoriesNavigator,
//     navigationOptions: {
//       tabBarLabel: 'Memories',
//       tabBarIcon: ({ tintColor }) => {
//         return <Image
//           source={require('./assets/icons/memories.png')}
//           style={[{width: 26, height: 26}, {tintColor: tintColor}]}
//         />
//       },
//     },
//   },
//   Profile: {
//     screen: ProfileNavigator,
//     navigationOptions: {
//       tabBarLabel: 'Profile',
//       tabBarIcon: ({ tintColor }) => {
//         return <Image
//           source={require('./assets/icons/profile.png')}
//           style={[{width: 26, height: 26}, {tintColor: tintColor}]}
//         />
//       },
//     },
//   },
//   Settings: {
//     screen: SettingsScreen,
//     navigationOptions: {
//       tabBarLabel: 'Settings',
//       tabBarIcon: ({ tintColor }) => {
//         return <Image
//           source={require('./assets/icons/settings.png')}
//           style={[{width: 26, height: 26}, {tintColor: tintColor}]}
//         />
//       },
//     },
//   },
// });

// export default class TabNav extends React.Component {
  
//   render() {
//     return(
//       <RootTabs />
//     )
//   }
// }



// // export default RootTabs;