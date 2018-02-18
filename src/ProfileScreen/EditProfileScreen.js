import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableHighlight, Image, TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { ImagePicker } from 'expo';
import {Segment } from 'expo'
import firebase from '../../firebase.js'
class EditProfileScreen extends React.Component {

    constructor(props) {
        super(props);
        const navigation = this.props.navigation;
        this.state = {user: navigation.state.params.user};
            Segment.identify(Expo.Constants.deviceId)
    Segment.screen("Edit Profile Screen")   
    }

    _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
        const user = Object.assign({}, this.state.user, { photo: {uri: result.uri} }); 
        this.setState({ user });
    }
  };

    // pickImage() {
    //     console.log(ImagePicker)
    //     ImagePicker.openPicker({
    //         width: 300,
    //         height: 400,
    //         cropping: true,
    //         cropperCircleOverlay: true
    //     }).then(image => {
    //         // const user = Object.assign({}, this.state.user, { photo: require(image) }); 
    //         // this.setState({ user });
    //         console.log(image);
    //     });
    // }

  render() {
    const navigation = this.props.navigation;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection:'column', marginTop:'20%' }}>
            <TouchableHighlight underlayColor='rgba(200,200,200,0.8)' style= {{height:150, width:150, borderRadius:150/2, marginBottom:20}} onPress = {() => {this._pickImage()}}>
                <Image source = {this.state.user.photo} style = {{alignItems: 'center', justifyContent: 'center', height:150, width:150, borderRadius:150/2}}>
                    <View style={{alignItems: 'center', justifyContent: 'center', height:150, width:150, borderRadius:150/2, backgroundColor:'rgba(150,150,150,0.7)'}}>
                        <Text>change profile picture</Text>
                    </View>
                </Image>
            </TouchableHighlight>
            <TextInput
                style={{textAlign:'center', borderColor: 'gray', backgroundColor: 'white', borderWidth:1, height: 64, fontSize:48}}
                autoCapitalize='words'
                placeholder="Enter name here"
                value={this.state.user.name}
                onChangeText={(text) => {
                    const user = Object.assign({}, this.state.user, { name: text }); 
                    this.setState({ user });
                }}
                returnKeyType='done'
            />
            <View style={{alignItems: 'center', justifyContent: 'center', flexDirection:'row', marginTop:15}}>
                <Text style = {{fontSize:24, color:'#666'}}>Birthday: </Text>
                <DatePicker 
                    date='string' 
                    format='MMMM D, YYYY' 
                    confirmBtnText='Done' 
                    cancelBtnText='Cancel' 
                    showIcon={false} 
                    date={this.state.user.birthday} 
                    onDateChange={(date) => {
                        const user = Object.assign({}, this.state.user, { birthday: date }); 
                        this.setState({ user });
                    }} 
                    customStyles={{
                        dateText:{fontSize:18, color:'#666'}
                    }}
                    style={{width:200, backgroundColor: 'white'}}/>
            </View>
            

            <TouchableHighlight underlayColor='rgba(200,200,200,0.8)'
                style={{position:'absolute', right:20, bottom:20, height:64, width:64, borderRadius:64/2}}
                onPress={() => {
                    navigation.state.params.onSave(this.state.user);
                    navigation.goBack();
                }}> 
                <View style={{alignItems: 'center', justifyContent:'center', flexDirection:'column', backgroundColor:'#EE4948',height:64, width:64, borderRadius:64/2, shadowColor: '#000000', shadowOffset: {width: 0, height: 4}, shadowRadius: 4, shadowOpacity: 0.7}}>
                    <Text style={{color:'#FFF', fontSize:18}}>Save</Text>
                </View>
            </TouchableHighlight>
        </View>
    );
  }
}
  

export default EditProfileScreen;