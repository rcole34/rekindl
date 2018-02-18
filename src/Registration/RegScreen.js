 //firebase facebook redirect uri: https://rekindl-27d5f.firebaseapp.com/__/auth/handler

import React, { Component } from 'react';
import {Segment } from 'expo'

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// your brand's theme primary color
const brandColor = '#EE4948';

const styles = StyleSheet.create({
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
  button: {
    marginTop: 20,
    height: 50,
    backgroundColor: brandColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width:250,
  },
  button2: {
    marginTop: 20,
    height: 50,
    backgroundColor: '#666',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width:250,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
});

export default class example extends Component {

  constructor(props) {
    super(props);
    Segment.identify(Expo.Constants.deviceId)
    Segment.screen("Registration Screen")
  }


  render() {

    let headerText = 'Welcome to rekindl!'
    let button1Text = 'Create account as new user'
    let button2Text = 'Sign in as existing user'
    let textStyle = {
      height: 50,
      textAlign: 'center',
      fontSize: 40,
      fontWeight: 'bold',
      fontFamily: 'Courier'
    }

    return (

      <View style={styles.container}>

        <Text style={styles.header}>{headerText}</Text>

          <View style={{justifyContent:'center', alignItems:'center'}}><TouchableOpacity style={styles.button} onPress={() => {
            Segment.track("Reg - Clicked Sign Up");
            this.props.navigation.navigate('SignUp', {})}}>
            <Text style={styles.buttonText}>{ button1Text }</Text>
          </TouchableOpacity></View>

          <View style={{justifyContent:'center', alignItems:'center'}}><TouchableOpacity style={styles.button2} onPress={() => {
            Segment.track("Reg - Clicked Sign In");
            this.props.navigation.navigate('SignIn', {})}}>
            <Text style={styles.buttonText}>{ button2Text }</Text>
          </TouchableOpacity></View>

      </View>

    );
  }
}