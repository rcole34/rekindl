import React from 'react';
import { Alert, View, Text, Image, FlatList, TouchableHighlight, Dimensions } from 'react-native';
import firebase from '../../firebase.js'
import * as OpenAnything from 'react-native-openanything';
import {Segment } from 'expo'

class SettingsScreen extends React.Component {
  
    constructor(props) {
        super(props);
        Segment.identify(Expo.Constants.deviceId)
        Segment.screen("Settings Screen")
        this.state = {settings: [
                {key: 1, title: 'Notification Settings', onPress: /*this.props.navigation.navigate('NotificationSettings', {})*/this._deleteAccount}, 
                {key: 2, title: 'Manage Connections', onPress: /*this.props.navigation.navigate('ManageConnections', {})*/this._deleteAccount},
                /*{key: 3, title: 'Change Default Text Message', onPress: this.props.navigation.navigate('DefaultText', {})},*/
                {key: 4, title: 'View Tutorial', onPress: /*this.props.navigation.navigate('Tutorial', {})*/this._deleteAccount},
                {key: 5, title: 'Send Feedback', onPress: this._sendFeedback},
                {key: 6, title: 'Sign Out', onPress: this._signOut},
                {key: 7, title: 'Delete Account', onPress: this._deleteAccount}
            ]}


        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                this.state = {uid : user.uid};
                //get friends of user
            }
        })
    }

    _sendFeedback = function() {
        Segment.track("Send Feedback");
        OpenAnything.Email('rekindlapp@gmail.com', 'Feedback on rekindl')
    }

    _signOut = function() {
        Segment.track("Signed Out");
        firebase.auth().signOut().then(function() {
            //this.props.navigation.navigate('Registration',{})
        }).catch(function(error) {
            Alert.alert('Oops!', error.message)
        });
    }

    _deleteAccount = function() {
        Segment.track("Feature not Implemented");
        Alert.alert('Oops!', 'Sorry, this feature is not yet implemented.')
    }

  

  render() {

    const navigation = this.props.navigation
    return (
      <View style={{ backgroundColor: '#333', flex: 1 }}>
        <FlatList
                data={this.state.settings}
                extraData={this.state}
                renderItem={({item}) => this._renderList(item, navigation)}
                ItemSeparatorComponent={this.renderSeparator}/>
      </View>
    );
  }

  _renderList(item, navigation) {
    return (
        
        <TouchableHighlight underlayColor='#222' onPress = {() => item.onPress()}>
            <View style={{flex:1, justifyContent:'center', width: Dimensions.get('window').width, height: 50}}>
                <Text style={{color:'white', lineHeight: 50, fontSize:20, left: '5%'}}>{item.title}</Text>
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
          }}
        />
      );
    };
}

export default SettingsScreen;
