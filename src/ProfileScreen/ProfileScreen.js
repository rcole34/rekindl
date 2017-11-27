import React from 'react';
import { View, Text, Image } from 'react-native';

class ProfileScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) => {
      return <Image
        source={require('../../assets/icons/profile-white.png')}
        style={[{width: 26, height: 26}, {tintColor: tintColor}]}
      />
    },
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profile Screen</Text>
      </View>
    );
  }
}

export default ProfileScreen;
