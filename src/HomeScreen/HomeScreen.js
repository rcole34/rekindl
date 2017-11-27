import React from 'react';
import { View, Text, Image } from 'react-native';

class HomeScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ tintColor }) => {
      return <Image
        source={require('../../assets/icons/home-white.png')}
        style={[{width: 26, height: 26}, {tintColor: tintColor}]}
      />
    },
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

export default HomeScreen;
