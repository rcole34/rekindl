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
  Alert,
  TouchableHighlight,
  Image,
  AsyncStorage
} from 'react-native';

import { ImagePicker } from 'expo';
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
    fontFamily: 'Helvetica',
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
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    paddingRight: 10
  }
});

export default class example extends Component {

  constructor(props) {
    super(props);
    this.state = {
        success:true,
        photo: require('../../assets/profilePictures/default-profile.png')
    };
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
        this.setState({photo: { uri: result.uri }});
    }
  };



  _signUp = () => {
    let values = this.refs.form.getValues()
    errMess = ''
    if(values.password !== values.password2) {
      errMess += 'Passwords do not match. '
    }
    if(values.password.length < 5) {
      errMess += 'Password must be longer than 5 characters. '
    }
    if(values.firstName === '') {
      errMess += 'First name is required. '
    }
    if(values.phone.length != 10) {
      errMess += 'Phone number must consist of 10 digits and no spaces. '
    }
    if(errMess !== '') {
      Alert.alert('Oops!', errMess)
      return
    }
    firebase.auth().createUserWithEmailAndPassword(values.email, values.password).catch(function(error) {
      Alert.alert('Oops!', error.message)
    });
    firebase.auth().onAuthStateChanged(async user => {
        if(user) {
          let userPhotos = JSON.parse(await AsyncStorage.getItem('userPhotos')) || {}
            user.updateProfile({
              displayName: values.firstName + ' ' + values.lastName,
              phoneNumber: values.phone
            }).catch(function(error) {
              Alert.alert('Oops!', error.message)
              return
            });
            if(userPhotos){
                userPhotos[user.uid] = this.state.photo
            }
            
            AsyncStorage.setItem('userPhotos', JSON.stringify(userPhotos))
            firebase.database().ref('users').child(user.uid).set({firstName:values.firstName, lastName:values.lastName, status:'New to rekindl!', notifications:true})
            this.props.navigation.navigate('Home', {})
        }
    })
  }

  render() {

    let headerText = 'Sign up to start rekindling'
    let buttonText = 'Create Account';

    return (

      <View style={styles.container}>

        <Text style={styles.header}>{headerText}</Text>

        <View style={{alignItems:'center', justifyContent:'center'}}><TouchableHighlight underlayColor='rgba(200,200,200,0.8)' style= {{alignItems:'center', justifyContent:'center', height:100, width:100, borderRadius:100/2, marginBottom:10}} onPress = {() => {this._pickImage()}}>
                <Image source = {this.state.photo} style = {{alignItems: 'center', justifyContent: 'center', height:100, width:100, borderRadius:100/2}}>
                    <View style={{alignItems: 'center', justifyContent: 'center', height:100, width:100, borderRadius:100/2, backgroundColor:'rgba(150,150,150,0.4)'}}>
                        <Text>set photo</Text>
                    </View>
                </Image>
            </TouchableHighlight></View>

        <Form ref={'form'} style={styles.form}>

          
        <View style={{ flexDirection: 'row' }}>
            <TextInput
              ref={'textInputFN'}
              name={'firstName' }
              type={'TextInput'}
              underlineColorAndroid={'transparent'}
              autoCapitalize={'words'}
              autoCorrect={false}
              placeholder={'*First Name'}
              style={styles.textInput }
              returnKeyType='next'
              autoFocus
              placeholderTextColor={'#999'}
              selectionColor={'#f1f1f1'}/>

              <TextInput
              ref={'textInputLN'}
              name={'lastName' }
              type={'TextInput'}
              underlineColorAndroid={'transparent'}
              autoCapitalize={'words'}
              autoCorrect={false}
              placeholder={'Last Name'}
              style={styles.textInput }
              returnKeyType='next'
              placeholderTextColor={'#999'}
              selectionColor={'#f1f1f1'}/>
        </View>


        <View style={{ flexDirection: 'row', marginTop: 30 }}>
            <TextInput
              ref={'textInputPN'}
              name={'phone' }
              type={'TextInput'}
              underlineColorAndroid={'transparent'}
              autoCapitalize={'none'}
              autoCorrect={false}
              placeholder={'*Phone Number (10 digits)'}
              style={styles.textInput }
              returnKeyType='next'
              keyboardType='phone-pad'
              placeholderTextColor={'#999'}
              selectionColor={'#f1f1f1'}/>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 30 }}>


            <TextInput
              ref={'textInputEM'}
              name={'email' }
              type={'TextInput'}
              underlineColorAndroid={'transparent'}
              autoCapitalize={'none'}
              autoCorrect={false}
              placeholder={'*Email'}
              style={styles.textInput }
              returnKeyType='next'
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
              placeholder={'*Password'}
              style={styles.textInput }
              returnKeyType='next'
              placeholderTextColor={'#999'}
              selectionColor={'#f1f1f1'}
              secureTextEntry={true}/>

          </View>

          <View style={{ flexDirection: 'row', marginTop:30 }}>

            <TextInput
              ref={'textInputPW2'}
              name={'password2' }
              type={'TextInput'}
              underlineColorAndroid={'transparent'}
              autoCapitalize={'none'}
              autoCorrect={false}
              placeholder={'*Confirm Password'}
              style={styles.textInput }
              returnKeyType='done'
              placeholderTextColor={'#999'}
              selectionColor={'#f1f1f1'}
              secureTextEntry={true}/>

          </View>

          
          <View style={{justifyContent:'center', alignItems:'center'}}><TouchableOpacity style={styles.button} onPress={this._signUp}>
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

