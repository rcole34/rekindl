import { View, Text, Button, StatusBar, AppRegistry, TouchableWithoutFeedback, Alert, Dimensions, StyleSheet, Image, TouchableHighlight, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Swipeout from 'react-native-swipeout'
import { NavigationActions } from 'react-navigation'
import {AsyncStorage} from 'react-native'
import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements'

import "@expo/vector-icons";

var data = {friends:[]}
var dataCopy = {friends:[]}
var hasFetched = false

var contacts = []


class AddFriendScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true}
    async function showFirstContactAsync() {
  // Ask for permission to query contacts.
  const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
  if (permission.status !== 'granted') {
    // Permission was denied...
    return;
  }
  var that = this;

  contacts = await Expo.Contacts.getContactsAsync({
    fields: [
      Expo.Contacts.PHONE_NUMBERS,
      Expo.Contacts.EMAILS,
      Expo.Contacts.IMAGE,
    ],
    pageSize: 1000,
    pageOffset: 0,
  });

       //`Phone numbers: ${JSON.stringify(contacts.data[3].phoneNumbers)}\n`

  for (var i = 0; i < contacts.total; i++) {
    if(contacts.data[i] != null && contacts.data[i].phoneNumbers[0] != null){
      var friend = {name: '', phoneNumber: '', image: ''}
      friend.name = contacts.data[i].name
      friend.phone = contacts.data[i].phoneNumbers[0].digits
      if(contacts.data[i].imageAvailable){
        friend.image = {uri: contacts.data[i].image.uri}
      } else {
        friend.image = require('../../assets/profilePictures/default-profile.png')
      }
      data.friends.push(friend)
    }
  }


  data.friends.sort(function(a, b){
 var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
 if (nameA < nameB) //sort string ascending
  return -1;
 if (nameA > nameB)
  return 1;
 return 0; //default return value (no sorting)
});

dataCopy.friends = data.friends


}
  if(!hasFetched){
    showFirstContactAsync();
    hasFetched = true
  } 

  }

componentDidMount(){
  data.friends = dataCopy.friends
  this.forceUpdate()
}


searchText(text){
  var dataCopy2 = {friends:[]}
  dataCopy2.friends = dataCopy.friends
  console.log(text)
    data.friends = dataCopy2.friends.filter((el) =>
    el.name.toLowerCase().indexOf(text.toLowerCase()) > -1)
    this.forceUpdate()
  }


resetData(text){
  console.log("RESET")
}



/* render method for new prototype*/
  render() {
        const { navigate } = this.props.navigation;
       // console.log(this.props.navigation)

    return(
      <View style={styles.container}>
      <SearchBar
      noIcon = 'true'
      placeholder='Search' 
      onChangeText={this.searchText.bind(this)}
   onClearText={this.resetData()}
      containerStyle = {{top: -25}}/>



        <FlatList
            //onEndReached={(info: {distanceFromEnd: 1}) => this.getContacts()}
            data={data.friends}
            extraData={this.state}
            renderItem={({item}) => this._renderItem(item, {navigate})}/>
      </View>
      );
  }


_renderItem(item, navigation){
    return(
    <TouchableOpacity onPress={() => { navigation.navigate('AddFriendInfo', {onSave: this.props.navigation.state.params.onSave, newFriend: {firstName: item.name.split(" ")[0], lastName: item.name.split(" ")[1], phone: item.phone, photo: item.image, category:'biweekFriend' }});}}>
        <View style={{flex: 1, flexDirection: 'row', marginLeft:10, marginRight:10}} >
                <View style={{flex: 1, height: 80, flexDirection: 'row', marginLeft:10, marginRight:10}}>
                    <Image source={item.image} style={{height:50, width:50, borderRadius:50/2}}/>
                    <Text style={{color:'white', marginLeft: 15, paddingTop: 10}}>{item.name} {"\n"}{item.phone}</Text> 
                </View> 
        </View>
      </TouchableOpacity>
    );
}

}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#333',
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})


export default AddFriendScreen;
  