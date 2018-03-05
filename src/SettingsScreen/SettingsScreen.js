import React from 'react';
import { Alert, AlertIOS, View, Text, Image, FlatList, TouchableHighlight, Dimensions } from 'react-native';
import firebase from '../../firebase.js'
import * as OpenAnything from 'react-native-openanything';
import {Segment, Permissions, Notifications } from 'expo';
import {registerForNotifications, handleNotifications} from '../../notificationHandler.js';

class SettingsScreen extends React.Component {
  
    constructor(props) {
        super(props);
        Segment.identify(Expo.Constants.deviceId)
        Segment.screen("Settings Screen")
        this.state = {settings: [
                {key: 1, title: 'Notification Settings', onPress: /*this.props.navigation.navigate('NotificationSettings', {})*/this._moveToPushOptions}, 
                {key: 2, title: 'Manage Connections', onPress: this._manageConnections},
                /*{key: 3, title: 'Change Default Text Message', onPress: this.props.navigation.navigate('DefaultText', {})},*/
                /*{key: 4, title: 'View Tutorial', onPress: this.props.navigation.navigate('Tutorial', {})this._deleteAccount},*/
                {key: 5, title: 'Send Feedback', onPress: this._sendFeedback},
                {key: 6, title: 'Sign Out', onPress: this._signOut},
                {key: 7, title: 'Delete Account', onPress: this._deleteAccountPressed}
            ], handlerSet: false}
    }

    _manageConnections = function() {
        Segment.track("Manage Connections");
        this.props.navigation.navigate('ManageConnections', {})
    }.bind(this)

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

    _deleteAccountPressed = function() {
        Segment.track("Delete Account Pressed");
        AlertIOS.prompt('Delete Account', 'Confirm your password in order to delete your account. Note that this cannot be undone.', [
            {text: 'Delete', onPress: (password) => this._deleteAccount(password), style: 'destructive'},
            {text: 'Cancel', style: 'cancel'},
        ], 'secure-text')
    }.bind(this)

    _deleteAccount = function(password) {
        Segment.track("Delete Account Confirmed");
        var user = firebase.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email, 
            password
        );
        user.reauthenticateWithCredential(credential).then(function() {
            // firebase.auth().signOut().then(function() {
            //     //this.props.navigation.navigate('Registration',{})
            // }).catch(function(error) {
            //     Alert.alert('Oops!', error.message)
            // });
            user.delete().then(function() {
                firebase.database().ref('users').child(user.uid).remove()
            }).catch(function(error) {
                Alert.alert('Oops!', error.message);
            });
        }).catch(function(error) {
            Alert.alert('Oops!', error.message);
        });
        
    }

    _moveToPushOptions = function() {
        //console.log("Moving");
        //console.log(this.props);
        this.props.navigation.navigate("PushOption", {});
    }.bind(this);

    componentWillMount() {
        var currUser = firebase.auth().currentUser;
        firebase.database().ref('users').child(currUser.uid).child('notifications').on('value', (snapshot) => {
            if (snapshot.val() && !this.state.handlerSet) {
                this._notificationSubscription = Notifications.addListener(handleNotifications);
                this.state.handlerSet = true;
            } else if (!snapshot.val() && this.state.handlerSet) {
                this._notificationSubscription.remove(handleNotifications);
                this.state.handlerSet = false;
            }
            this.setState({
                handlerSet: this.state.handlerSet
            });
        });
    }

    componentWillUnmount() {
        //console.log("Settings Mounting");
        if (this.state.handlerSet) {
            this._notificationSubscription.remove(handleNotifications);
            this.setState({
                handlerSet: false
            });

        }
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
          }}/>
      );
    };
}

export default SettingsScreen;
