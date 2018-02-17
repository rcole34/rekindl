/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 //firebase facebook redirect uri: https://rekindl-27d5f.firebaseapp.com/__/auth/handler

import React, { Component } from 'react';
import firebase from '../../firebase.js'

import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Alert
} from 'react-native';

import Frisbee from 'frisbee';
import Spinner from 'react-native-loading-spinner-overlay';
import Form from 'react-native-form';
import CountryPicker from 'react-native-country-picker-modal';

const api = new Frisbee({
  baseURI: 'http://localhost:3000',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

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

export default class example extends Component {

  constructor(props) {
    super(props);
    this.state = {
        success:true,
      
    };
  }



  _signIn = () => {
    let values = this.refs.form.getValues()
    firebase.auth().signInWithEmailAndPassword(values.email, values.password).catch(function(error) {
        Alert.alert('Oops!', error.message)

    })
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            this.props.navigation.navigate('Home', {})
        }
    })
  }

  render() {

    let headerText = 'Sign in to rekindl your friendships'
    let buttonText = 'Sign In';

    return (

      <View style={styles.container}>

        <Text style={styles.header}>{headerText}</Text>

        <Form ref={'form'} style={styles.form}>

          <View style={{ flexDirection: 'row' }}>


            <TextInput
              ref={'textInputEM'}
              name={'email' }
              type={'TextInput'}
              underlineColorAndroid={'transparent'}
              autoCapitalize={'none'}
              autoCorrect={false}
              placeholder={'Email'}
              style={styles.textInput }
              returnKeyType='next'
              autoFocus
              placeholderTextColor={'#999'}
              selectionColor={'#f1f1f1'}/>
        </View>
        <View style={{ flexDirection: 'row', marginTop:30 }}>

            <TextInput
              ref={'textInputPW'}
              name={'password' }
              type={'TextInput'}
              underlineColorAndroid={'transparent'}
              autoCapitalize={'none'}
              autoCorrect={false}
              placeholder={'Password'}
              style={styles.textInput }
              returnKeyType='done'
              placeholderTextColor={'#999'}
              selectionColor={'#f1f1f1'}
              secureTextEntry={true}/>

          </View>

          <View style={{justifyContent:'center', alignItems:'center'}}><TouchableOpacity style={styles.button} onPress={this._signIn}>
            <Text style={styles.buttonText}>{ buttonText }</Text>
          </TouchableOpacity></View>


        </Form>

        <Spinner
          visible={this.state.spinner}
          textContent={'One moment...'}
          textStyle={{ color: '#fff' }} />

      </View>

    );
  }
}

