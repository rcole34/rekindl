import React from 'react';
import { TextInput, View, Text, Button, StyleSheet, Image, TouchableHighlight, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { ImagePicker } from 'expo';
import { NavigationActions } from 'react-navigation'


class AddFriendInfoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {newFriend:{name:'', photo:require('../../assets/profilePictures/default-profile.png'), phone:''}};
    
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
        const newFriend = Object.assign({}, this.state.newFriend, { photo: {uri: result.uri} }); 
        this.setState({ newFriend });
    }
  };
  
render() {
    const navigation = this.props.navigation;
    return(
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection:'column', marginTop:'20%' }}>
            <TouchableHighlight underlayColor='rgba(200,200,200,0.8)' style= {{height:150, width:150, borderRadius:150/2, marginBottom:20}} onPress = {() => {this._pickImage()}}>
                <Image source = {this.state.newFriend.photo} style = {{alignItems: 'center', justifyContent: 'center', height:150, width:150, borderRadius:150/2}}>
                    <View style={{alignItems: 'center', justifyContent: 'center', height:150, width:150, borderRadius:150/2, backgroundColor:'rgba(150,150,150,0.7)'}}>
                        <Text>set profile picture</Text>
                    </View>
                </Image>
            </TouchableHighlight>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize:28}}>Name: </Text>
                <TextInput
                    style={{textAlign:'center', borderColor: 'gray', borderWidth:1, height: 48, fontSize:32}}
                    autoCapitalize='words'
                    placeholder="Enter friend's name"
                    value={this.state.newFriend.name}
                    onChangeText={(text) => {
                        const newFriend = Object.assign({}, this.state.newFriend, { name: text }); 
                        this.setState({ newFriend });
                    }}
                    returnKeyType='done'
                />
            </View>
            <View style={{flexDirection:'row', marginTop:30, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize:18}}>Phone: </Text>
                <TextInput
                    style={{textAlign:'center', borderColor: 'gray', borderWidth:1, height: 32, fontSize:24}}
                    placeholder="Enter phone number"
                    value={this.state.newFriend.phone}
                    keyboardType='phone-pad'
                    onChangeText={(text) => {
                        const newFriend = Object.assign({}, this.state.newFriend, { phone: text }); 
                        this.setState({ newFriend });
                    }}
                    returnKeyType='done'
                />
            </View>
            <TouchableHighlight underlayColor='rgba(200,200,200,0.8)'
                style={{position:'absolute', right:20, bottom:20, height:64, width:64, borderRadius:64/2}}
                onPress={() => {
                    navigation.state.params.onSave(this.state.newFriend);
                    navigation.goBack()
                    navigation.state.params.goBack()

                }}>
                <View style={{alignItems: 'center', justifyContent:'center', flexDirection:'column', backgroundColor:'#EE4948',height:64, width:64, borderRadius:64/2, shadowColor: '#000000', shadowOffset: {width: 0, height: 4}, shadowRadius: 4, shadowOpacity: 0.7}}>
                    <Text style={{color:'#FFF', fontSize:18}}>Add</Text>
                </View>
            </TouchableHighlight>
          </View>
);
}
}


export default AddFriendInfoScreen;