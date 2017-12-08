import React from 'react';
import { Button, Image, View, TouchableHighlight, Text } from 'react-native';
import { ImagePicker } from 'expo';
import ModalDropdown from 'react-native-modal-dropdown'
import { AsyncStorage } from 'react-native'

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

  constructor(props) {
    super(props);

    this.state = {isLoading: true}
  }


  async componentWillMount() {
    this.forceUpdate();
    AsyncStorage.getItem('friends').then((list) => {
      if (list == null) return
      let friends = JSON.parse(list).allData

      optionsList = []
      optionsKeys = []
      for (var i = 0; i < friends.length; i++) {
        optionsList.push(friends[i].name)
        optionsKeys.push(friends[i].key)
      }


      AsyncStorage.getItem('photos').then((list) => {
        if (list == null) return
        let photos = JSON.parse(list).photos

        this.setState({
          isLoading: false,
          friend: 'All Friends',
          friendKey: optionsKeys[0], 
          options: optionsList,
          optionsKeys: optionsKeys,
          image: require('../../assets/icons/photo.png'),
          showButton: 'false',
        })
      })
    })
  }

  savePhotoDb() {
    AsyncStorage.getItem('photos').then((list) => {
      if (list == null) return
      let photos = JSON.parse(list).photos

      photosCopy = photos.slice()

      newPhoto = {
        key: new Date().getUTCMilliseconds(), 
        friendKey: this.state.friendKey, 
        file: this.state.image
      },
      photosCopy.unshift(newPhoto)

      store = {photos: photosCopy}

      AsyncStorage.setItem('photos', JSON.stringify(store))  
    })



  }



  // state = {
  //   showButton: 'false',
  //   image: require('../../assets/icons/photo.png'),
  //   friend: 'Claire R.'
  // };

  render() {
    if (this.state.isLoading) {
      return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>Loading...</Text></View>;
    }
    const { navigate } = this.props.navigation;

    return (
      <View style={{ flex: 1, alignItems: 'center' }}>

        <Text style={{ fontSize: 30, color:'#666', marginBottom: 10, marginTop: 45}}>Add a Memory With:</Text>
        <ModalDropdown
            options={this.state.options}
            defaultValue= {this.state.options[0]}
            defaultIndex={0}
            onSelect={(idx, value) => { 
              this.state.friend = value; 
              this.state.friendKey = this.state.optionsKeys[this.state.options.indexOf(value)]
              this.setState(this.state); 
            }}
            showsVerticalScrollIndicator={true}
            textStyle={{textAlign: 'center', width: 150, backgroundColor: 'white', borderColor: 'gray', borderWidth:1, fontSize: 28}}
            dropdownStyle={{width: 150}}
            dropdownTextStyle={{textAlign: 'center', width:150, fontSize: 18}}>
        </ModalDropdown>

        <TouchableHighlight underlayColor='rgba(200,200,200,0.8)' style= {{height:250, width:225, marginTop: 30}} onPress = {() => {this._pickImage()}}>
          <View style={{ flex: 2, alignItems: 'center' }}>
          <Image source = { this.state.image } style={{width: 250, height: 250}}/>
          </View>
        </TouchableHighlight>
        <Text style={{ fontSize: 20, color:'#666', marginTop: 10}}>tap photo to pick new image</Text>

        {this.state.showButton === 'true' && 
        <TouchableHighlight underlayColor='rgba(200,200,200,0.8)'
            onPress={() => {
              this.savePhotoDb()
              navigate('Memories', {image: this.state.image, friend: this.state.friendKey}) 
            }
          } style={{position:'absolute', right:20, bottom:20, height:64, width:64, borderRadius:64/2}}> 
        <View style={{alignItems: 'center', justifyContent:'center', flexDirection:'column', backgroundColor:'#EE4948',height:64, width:64, borderRadius:64/2, shadowColor: '#000000', shadowOffset: {width: 0, height: 4}, shadowRadius: 4, shadowOpacity: 0.7}}>
          <Text style={{color:'#FFF', fontSize: 20, marginBottom: 2 }}>Save</Text>
        </View>
      </TouchableHighlight>
      }
      
      </View>
    );
  }

  _renderButton() {

  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.cancelled) {
      this.setState({ showButton: 'true', image: {uri: result.uri }});
    }
  };
}
