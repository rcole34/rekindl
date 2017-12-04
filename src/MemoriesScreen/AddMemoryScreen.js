/*import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const AddMemoryScreen = ({navigation}) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Add Memory</Text>
  </View>
);

export default AddMemoryScreen;*/



import React from 'react';
import { Button, Image, View } from 'react-native';
import { ImagePicker } from 'expo';

export default class AddMemoryScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Memories',
    tabBarIcon: ({ tintColor }) => {
      return <Image
        source={require('../../assets/icons/memories.png')}
        style={[{width: 26, height: 26}, {tintColor: tintColor}]}
      />
    },
  };
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}
