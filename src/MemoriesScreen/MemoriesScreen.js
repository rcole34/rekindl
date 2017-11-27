import React from 'react';
import { View, Text, Image } from 'react-native';


class MemoriesScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Memories',
    tabBarIcon: ({ tintColor }) => {
      return <Image
        source={require('../../assets/icons/memories-white.png')}
        style={[{width: 26, height: 26}, {tintColor: tintColor}]}
      />
    },
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Memories Screen</Text>
      </View>
    );
  }
}

export default MemoriesScreen;
