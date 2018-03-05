import React from 'react';
import {AppLoading, Permissions} from 'expo'
import { NavigationActions } from 'react-navigation'
import firebase from './firebase.js'
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';

export default class SetUpScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isLoading: true}
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(async function(user) {
            if (user) {
                //firebase.database().ref('users').child(user.uid).child('mustLoadData').set(true)
                this.setState({isLoading: false})
                this.props.navigation.navigate('Home', /*{mustLoadData: true}*/)
                // console.log('user '+user.displayName+' in app.js')
            }
            else {
                // console.log('no user in app.js')
                this.setState({isLoading: false})
                this.props.navigation.navigate('Registration', {})
                
            }
        }.bind(this))
    }

    render() {
        if (this.state.isLoading) {
            return (
                <AppLoading/>
            );
        } else {
            return ( <View style={{backgroundColor:'#222'}}>
                <StatusBar barStyle="light-content"/>
                </View>);
        }
    }
}