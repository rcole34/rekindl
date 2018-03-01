import React from 'react';
import { Dimensions, Alert, View, Text, Button, StyleSheet, Image, TouchableHighlight, ScrollView, FlatList, Modal, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import * as OpenAnything from 'react-native-openanything';
import {AsyncStorage} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { LinearGradient } from 'expo'
import {Segment } from 'expo'
import firebase from '../../firebase.js'
// name accessed via {navigation.state.params.name}



export default class DetailScreen extends React.Component {


	constructor(props) {
    	super(props);
    	var currFriend = this.props.navigation.state.params.currFriend
    	var currGroup = {}
      Segment.identify(Expo.Constants.deviceId)
      Segment.screen("Friend Detail Screen")
    	if(currFriend.currFire === 'dead') {
    		currGroup = this.props.navigation.state.params.sortedFriends[0]
    	} else if(currFriend.currFire === 'tiny') {
    		currGroup = this.props.navigation.state.params.sortedFriends[1]
    	} else if(currFriend.currFire === 'small') {
    		currGroup = this.props.navigation.state.params.sortedFriends[2]
    	} else if(currFriend.currFire === 'medium') {
    		currGroup = this.props.navigation.state.params.sortedFriends[3]
    	} else if(currFriend.currFire === 'large') {
    		currGroup = this.props.navigation.state.params.sortedFriends[4]
    	}

    	var index = -1
    	for (var i = 0; i < currGroup.friends.length; i++) {
    		if(currGroup.friends[i].key === currFriend.key) {
    			index = i
    			break
    		}
    	};
    	this.state = {currGroup: currGroup, currFriend: currFriend, index: index, width: Dimensions.get('window').width, height: Dimensions.get('window').height};

  	}

  	_sendTextPress = function(name, number) {
  		OpenAnything.Text(number, 'Hey, ' + name + ' it\'s been a while since we talked! Want to meet up this week?');
  	}

  	_callPress = function(number) {
  		OpenAnything.Call(number)
  	}

  	_rekindlPressed = function(friend) {
  		Alert.alert(
  			'Update connection',
  			'Have you recently connected with ' + friend.firstName + ' and wish to rekindle this fire?',
  			[
  				{text: 'No'},
  				{text: 'Yes', onPress: () => {
            Segment.track("Reported Activity Alert Confirmation");
            this.props.navigation.state.params.rekindl(friend); this.props.navigation.goBack()}}
  			]
  		)
  	}

  	_getLastConnectedTime = function(timestamp) {
  		if(timestamp === 'never') return 'never'
  		timeApart = Date.now() - timestamp
  		daysApart = Math.floor(timeApart * 1.0/86400000)
  		message = ''
  		if(daysApart === 0) {
  			message = 'today'
  		}
  		else if(daysApart === 1) {
  			message = 'yesterday'
  		}
  		else {
  			message = daysApart.toString() + ' days ago'
  		}
  		return message
  	}



  	render() {
  		var pages = []

  		for(var i = 0; i < this.state.currGroup.friends.length; i++) {
  			((i) => {
  			pages.push(
				<View key={i} style={{width:'90%', height:'95%', borderRadius:10, backgroundColor:'#222', flexDirection:'column', alignItems:'center'}}>
			    	<Image source={this.state.currGroup.friends[i].photo} style={{width:this.state.width*0.9, height:this.state.height*0.9*0.467}}/>
			        <LinearGradient colors={['transparent', 'rgba(34,34,34,0.7)']} style={{position:'absolute', width:this.state.width*0.9, height:this.state.height*0.9*0.03, top:this.state.height*0.9*0.437}}/>
			        <Image source={this.state.currGroup.friends[i].bgFire} style={{position:'absolute', top:this.state.height*0.9*0.467, width:this.state.width*0.9, height:this.state.height*0.9*0.44, opacity:0.2}}/>
			        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:'3%'}}>
			        	<Text style={{backgroundColor:'transparent', fontWeight:'400', color:'white', fontSize:32}}>{this.state.currGroup.friends[i].firstName} {this.state.currGroup.friends[i].lastName}</Text>
			        	<Image source={this.state.currGroup.friends[i].fire} style={{marginLeft:'1%', height:60, width:60, bottom:10}}/>
			       	</View>
			        {this.state.currGroup.friends[i].status?
			        	<View style={{alignItems:'center'}}>
			        		<Text style={{backgroundColor:'transparent',color:'white', fontSize:18, marginTop:'5%'}}>{this.state.currGroup.friends[i].status}</Text>
			        		<Text style={{backgroundColor:'transparent',color:'white', fontStyle:'italic', marginLeft:'50%', marginTop:'4%'}}>Posted {this._getLastConnectedTime(this.state.currGroup.friends[i].statusPosted)}</Text>
			        	</View>
			        	:<Text style={{backgroundColor:'transparent',color:'white', fontStyle:'italic', marginTop:'8%'}}>No recent status</Text>
			        }
			        <View style={{alignItems:'center', flexDirection:'row', position:'absolute', bottom:'15%'}}>
			        	<TouchableOpacity activeOpacity={0.25} style={{right:'50%'}} onPress={() => {
                 Segment.track("Message Friend");

                  this._sendTextPress(this.state.currGroup.friends[i].firstName, this.state.currGroup.friends[i].number)}}>
			        		<Image source={require('../../assets/icons/send-text.png')} style={{height:50, width:50, tintColor:'#fff'}}/>
			        	</TouchableOpacity>
			        	<TouchableOpacity activeOpacity={0.25} style={{left:'50%'}} onPress={() => {
                  Segment.track("Call Friend");
                  this._callPress(this.state.currGroup.friends[i].number)}}>
			        		<Image source={require('../../assets/icons/phone-outline.png')} style={{height:50, width:50, tintColor:'#fff'}}/>
			        	</TouchableOpacity>
			        </View>
			        <TouchableOpacity style={{position:'absolute', bottom:'9%'}} activeOpacity={0.25} onPress={() => {
                Segment.track("Update connection");
                this._rekindlPressed(this.state.currGroup.friends[i])}}>
								<View style={{borderWidth: 1, borderColor: 'white', borderRadius: 8, padding: 5}}>
								<Text style={{backgroundColor:'transparent', color: 'white'}}>Update connection</Text>
								</View>
			        </TouchableOpacity>
			        <Text style={{backgroundColor:'transparent',position:'absolute', bottom:'5%', color:'white', fontStyle:'italic'}}>Last connected {this._getLastConnectedTime(this.state.currGroup.friends[i].lastConnected)}</Text>
			   	</View>
			)
			})(i)
		}

  		return (
	  		<View style={{flex: 1, backgroundColor:'#222'}}>
				<Swiper ref="cardSwiper"
						loop={false}
						bounces={true}
						index={this.state.index}
						style={{right:'5%', left:'5%', top:'2%', bottom:'3%'}}
						dot={
							<View style={{backgroundColor:'white', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />
						}
						activeDot={
							<View style={{alignItems:'center', justifyContent:'center', backgroundColor: 'white', width: 14, height: 14, borderRadius: 7, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}}>
								<View style={{backgroundColor: '#333', width: 6, height: 6, borderRadius: 3}} />
							</View>
						}>
					{pages}
			    </Swiper>
			</View>
		);
	}

}
