import React, { Component } from 'react';
import firebase from '../../firebase.js'
import {
  ReactNative,
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Alert,
  TouchableHighlight,
  Image,
  AsyncStorage,
  Switch
} from 'react-native';
import { Segment, Permissions, Notifications } from 'expo';
import {registerForNotifications, handleNotifications } from '../../notificationHandler.js';
import { sendNotification } from '../../notificationSender.js';

const MAX_LENGTH_CODE = 6;
const MAX_LENGTH_NUMBER = 20;

// if you want to customize the country picker
const countryPickerCustomStyles = {};

// your brand's theme primary color
const brandColor = '#EE4948';

const styles = StyleSheet.create({
  countryPicker: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor:'#333'
  },
  header: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 22,
    margin: 20,
    color: '#f1f1f1',
  },
  form: {
    margin: 20
  },
  textInput: {
    padding: 0,
    margin: 0,
    flex: 1,
    fontSize: 20,
    color: '#f1f1f1'
  },
  button: {
    marginTop: 50,
    height: 50,
    backgroundColor: brandColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft:20,
    marginRight:20
  },
  wrongNumberText: {
    margin: 10,
    fontSize: 14,
    textAlign: 'center'
  },
  disclaimerText: {
    marginTop: 30,
    fontSize: 12,
    color: 'lightgrey'
  },
  callingCodeView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  callingCodeText: {
    fontSize: 20,
    color: "#f1f1f1",
    fontWeight: 'bold',
    paddingRight: 10
  }
});

class PushOptionScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      notifs: false,
      buttonText: this.setButtonText(false)
    };
  }

  componentWillMount() {
    var currUser = firebase.auth().currentUser;
    //console.log("Mounting");
    firebase.database().ref('users').child(currUser.uid).child('notifications').on('value', (snapshot) => {
      if (snapshot.val()) {
        if (!this.state.handlerSet) {
          //console.log("Setting handler");
          this._notificationSubscription = Notifications.addListener(handleNotifications);
          this.state.handlerSet = true;
        }
      } else {
        if (this.state.handlerSet) {
          this._notificationSubscription.remove(handleNotifications);
          this.state.handlerSet = false;
        }
      }
      this.setState({
        handlerSet: this.state.handlerSet,
        notifs: snapshot.val(),
        buttonText: this.setButtonText(snapshot.val())
      });
      //console.log(snapshot.val());
      // this.setState({
      //   notifs: snapshot.val()
      // })
    });
  }

  componentWillUnmount() {
    if (this.state.handlerSet) {
      this._notificationSubscription.remove(handleNotifications);
      this.setState({
        handlerSet: false
      })
    }
  }

  async changeNotifPrefs() {
    var currUser = firebase.auth().currentUser;
    if (!this.state.notifs) {
      //console.log("Turning on notifs");
      await registerForNotifications();
    }
    var val = !this.state.notifs;
    firebase.database().ref('users').child(currUser.uid).child('notifications').set(val);
    /*
    this.setState({
      notifs: val,
      buttonText: this.setButtonText(val)
    })*/
    //firebase.database().ref('users').child(currUser.uid).child('notifications').set(!this.state.notifs);
  }

  async sendNotif() {
    var currUser = firebase.auth().currentUser;
    //console.log("Sending");
    await sendNotification(currUser.uid, "Title", "Body");
  }

  setButtonText(notifsOn) {
    if (notifsOn) return "Turn off notifications";
    return "Turn on notifications";
  }

  render() {
    let explainText = "Rekindl uses push notifications to do stuff";
    let confirmText = "Allow";
    let cancelText = "Deny";
    const navigation = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>{explainText}</Text>
        <TouchableOpacity style={styles.button}
        onPress={() => {this.sendNotif();}}><Text>Test Notifs</Text></TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
        onPress={() => {this.changeNotifPrefs()}}><Text>{this.state.buttonText}</Text></TouchableOpacity>
      </View>
      );
  }
}

export default PushOptionScreen;