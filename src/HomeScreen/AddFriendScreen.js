import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableHighlight, ScrollView, FlatList } from 'react-native';


const AddFriendScreen = ({navigation}) => (
  <View style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
  	<Text style={{fontSize:36, position:'absolute', top:'10%'}}>New Connection</Text>
  	<Text style={{fontSize:24, position:'absolute', top:'25%'}}>Add from</Text>
  	<View style={{flexDirection:'row', justifyContent:'flex-start', position:'absolute', top:'35%'}}>
  		<TouchableHighlight style={{margin:30}}>
  			<View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
  				<Image source={require('../../assets/icons/facebook.png')} style={{height:80, width:80, marginBottom:5}}/>
  				<Text>Facebook</Text>
  			</View>
  		</TouchableHighlight>
  		<TouchableHighlight style={{margin:30}}>
  			<View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
  				<Image source={require('../../assets/icons/contacts.png')} style={{height:80, width:80, marginBottom:5}}/>
  				<Text>Contacts</Text>
  			</View>
  		</TouchableHighlight>
  	</View>
  	{/*}
	<Text style={{fontSize:24, position:'absolute', top:'60%'}}>or</Text>
	<Text style={{fontSize:28, position:'absolute', top:'69%', textDecorationLine:'underline'}}>Enter Manually</Text>
    */}

  </View>
);




export default AddFriendScreen;