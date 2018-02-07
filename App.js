import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import DetailScreen from './src/HomeScreen/DetailScreen.js';
import HomeScreen from './src/HomeScreen/HomeScreen.js'
import AddFriendScreen from './src/HomeScreen/AddFriendScreen.js';
import SettingsScreen from "./src/SettingsScreen/SettingsScreen.js";
// import ScheduleScreen from './ScheduleScreen/ScheduleScreen.js';
import AddFriendInfoScreen from './src/HomeScreen/AddFriendInfoScreen.js';
import ProfileScreen from "./src/ProfileScreen/ProfileScreen.js";
import EditProfileScreen from "./src/ProfileScreen/EditProfileScreen.js";
import * as firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyCgrNCNxDVCYPa7IBq3d0zQFCWTaNNsQxg",
  authDomain: "rekindl-27d5f.firebaseapp.com",
  databaseURL: "https://rekindl-27d5f.firebaseio.com",
  storageBucket: "rekindl-27d5f.appspot.com"
};
firebase.initializeApp(firebaseConfig);


class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('./assets/icons/white-with-logo.png')}
        style={{ width: 100, height: 27 }}/>
    );
  }
}

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: <LogoTitle/>,
      headerLeft: <TouchableWithoutFeedback
        onPress={() => navigation.navigate('Profile')}>
          <View>
            <Image source={require('./assets/icons/profile-filled.png')} style={{tintColor: '#fff', height: 30, width: 30, marginLeft: 15, marginBottom: 5}}/>
          </View>
      </TouchableWithoutFeedback>,
      
      headerStyle: {
        backgroundColor: '#222',
      },
      headerTintColor: '#fff',
      headerBackTitle: ' '
    }),
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: ({navigation}) => ({
      title: <LogoTitle/>,
      headerStyle: {
        backgroundColor: '#222',
      },
      headerTintColor: '#fff',
      headerBackTitle: ' '
    }),
  },
  AddFriend: {
    screen: AddFriendScreen,
    navigationOptions: ({navigation}) => ({
      title: <LogoTitle/>,
      headerStyle: {
        backgroundColor: '#222',
      },
      headerTintColor: '#fff',
      headerBackTitle: ' '
    }),
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({navigation}) => ({
      title: <LogoTitle/>,
      headerStyle: {
        backgroundColor: '#222',
      },
      headerTintColor: '#fff',
      headerBackTitle: ' '
    }),
  },
  EditProfile: {
    screen: EditProfileScreen,
    navigationOptions: ({navigation}) => ({
      title: <LogoTitle/>,
      headerStyle: {
        backgroundColor: '#222',
      },
      headerTintColor: '#fff',
      headerBackTitle: ' '
    }),
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: ({navigation}) => ({
      title: <LogoTitle/>,
      headerStyle: {
        backgroundColor: '#222',
      },
      headerTintColor: '#fff',
      headerBackTitle: ' '
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
      title: <LogoTitle/>,
      headerStyle: {
        backgroundColor: '#222',
      },
      headerTintColor: '#fff',
      headerBackTitle: ' '
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