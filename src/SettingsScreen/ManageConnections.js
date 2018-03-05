import React from 'react';
import { Alert, AlertIOS, View, Text, Image, FlatList, TouchableHighlight, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements'
import firebase from '../../firebase.js'
import * as OpenAnything from 'react-native-openanything';
import {Segment } from 'expo'

class ManageConnections extends React.Component {
  
    constructor(props) {
        super(props);
        Segment.identify(Expo.Constants.deviceId)
        Segment.screen("Settings Screen")
        //this.state = {friends:[{photo:require('../../assets/profilePictures/default-profile.png'), firstName: 'Ryan', lastName: 'Cole'},{photo:require('../../assets/profilePictures/default-profile.png'), firstName: 'Johnny', lastName: 'Rocket'}]}

        
        // this.state.friends.sort(function(a, b){
        //     var nameA=a.firstName.toLowerCase() + ' ' + a.lastName.toLowerCase(), nameB=b.firstName.toLowerCase() + ' ' + b.lastName.toLowerCase();
        //     if (nameA < nameB) //sort string ascending
        //         return -1;
        //     if (nameA > nameB)
        //         return 1;
        //     return 0; //default return value (no sorting)
        // });
        // this.state.friendsCopy = this.state.friends
    }

    async componentWillMount() {
        var user = firebase.auth().currentUser;
        this.setState({uid: user.uid})
        //get friends of user
        await firebase.database().ref('users').child(user.uid).child('friends').on('value', async function(snapshot) {
            list = snapshot.val()
            //console.log(list)
            friends = []
            for (key in list) {
                //console.log('adding friend to list', key, list[key])
                friends.push(list[key])
            };
            
            friends.sort(function(a, b){
                var nameA=a.firstName.toLowerCase() + ' ' + a.lastName.toLowerCase(), nameB=b.firstName.toLowerCase() + ' ' + b.lastName.toLowerCase();
                if (nameA < nameB) //sort string ascending
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0; //default return value (no sorting)
            });
            this.setState({friends: friends, friendsCopy: friends});
            //console.log(this.state.friendsCopy[0].firstName)
        }.bind(this))
    }

    searchText(text){
        var friendsCopy2 = []
        friendsCopy2 = this.state.friends
        this.state.friendsCopy = friendsCopy2.filter((el) =>
            (el.firstName.toLowerCase() + ' ' + el.lastName.toLowerCase()).indexOf(text.toLowerCase()) > -1)
        this.forceUpdate()
  }


    resetData(text){
      //console.log("RESET")
    }

    onSave = (user) => {
        var currUser = firebase.auth().currentUser;

        var update = {}
        update[user.number] = user

        if(user.oldNumber !== user.number) { //need to update key in database if number is not the same
            update[user.oldNumber] = null;
        }
        delete user.oldNumber
        firebase.database().ref('users').child(currUser.uid).child('friends').update(update);
    };


  

  render() {

    const navigation = this.props.navigation
    return (
      <View style={{ backgroundColor: '#333', flex: 1 }}>
        <SearchBar
            noIcon = {true}
            autoCorrect = {false}
            placeholder='Search for a connection' 
            onChangeText={this.searchText.bind(this)}
            onClearText={this.resetData()}
            containerStyle = {{}}/>
        <FlatList
            data={this.state.friendsCopy}
            extraData={this.state}
            renderItem={({item}) => this._renderList(item, navigation)}
            ItemSeparatorComponent={this.renderSeparator}/>
      </View>
    );
  }

  _renderList(item, navigation) {
    //console.log('here')
    return (
        
        <TouchableHighlight underlayColor='#222' onPress = {() => navigation.navigate('EditConnection', {friend: item, onSave: this.onSave})}>
            <View style={{flex:1, flexDirection:'row', alignItems:'center', width: Dimensions.get('window').width, height: 50}}>
                <Image source={item.photo} style={{height:30, width: 30, borderRadius: 15, marginLeft: '5%'}}/>
                <Text style={{color:'white', lineHeight: 50, marginLeft: '5%', fontSize:20}}>{item.firstName} {item.lastName}</Text>
                <Image source={require('../../assets/icons/arrow.png')} style={{height: 25, width:25, position:'absolute', right: '5%', tintColor:'white'}}/>
            </View>
        </TouchableHighlight>
        
    );
  }

  renderSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: '95%',
            backgroundColor: '#999',
            marginLeft:'2.5%',
            marginRight:'2.5%'
          }}/>
      );
    };
}

export default ManageConnections;
