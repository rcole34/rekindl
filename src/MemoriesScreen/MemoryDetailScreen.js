import React from 'react';
import { AsyncStorage, Alert, View, Text, Button, StyleSheet, Image, TouchableHighlight, ScrollView, FlatList, Modal, TouchableOpacity } from 'react-native';

export default class MemoryDetailScreen extends React.Component {

  	constructor(props) {
    	super(props);
    	const navigation = this.props.navigation;
    	this.photo = navigation.state.params.photo;
 	}

  render() {
  	const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source = { this.photo } style={{width: 315, height: 315, marginTop: 60}}/>
        <TouchableHighlight underlayColor='rgba(200,200,200,0.8)'
            onPress={() => {this._removePhotoPressed()} } style={{ flex: 1, height:64, width:200, borderRadius:2, marginTop: 30 }}> 
        <View style={{alignItems: 'center', justifyContent:'center', backgroundColor:'#EE4948', height:64, width:200, borderRadius:2 }}>
          <Text style={{ color:'#FFF', fontSize: 25 }}>Delete</Text>
        </View>
      </TouchableHighlight>
      </View>
    );
  }

  _removePhoto() {
    AsyncStorage.getItem('photos').then((list) => {

      if (list == null) return
      let photos = JSON.parse(list).photos


      photosCopy = []

      for (var i = 0; i < photos.length; i++) {
        if (photos[i].key !==  this.props.navigation.state.params.photoKey) {
          photosCopy.push(photos[i])
        } 
      }


      store = {photos: photosCopy}

      AsyncStorage.setItem('photos', JSON.stringify(store)).then(this.props.navigation.navigate('Memories'))
    })

  	
  }

  _removePhotoPressed(item) {
    Alert.alert('Delete memory with ' + this.props.navigation.state.params.friend + '?', 
      'This action cannot be recovered.', 
      [
        {text: 'Delete', onPress: () => this._removePhoto()},
        {text: 'Cancel'}
      ])
  }

}