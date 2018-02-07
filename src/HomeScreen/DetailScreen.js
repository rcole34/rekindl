import React from 'react';
import { Dimensions, Alert, View, Text, Button, StyleSheet, Image, TouchableHighlight, ScrollView, FlatList, Modal, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import * as OpenAnything from 'react-native-openanything';
import {AsyncStorage} from 'react-native'
import MemoriesScreen from "../MemoriesScreen/MemoriesScreen.js"
import { NavigationActions } from 'react-navigation'
import { LinearGradient } from 'expo'

// name accessed via {navigation.state.params.name}



export default class DetailScreen extends React.Component {


	constructor(props) {
    	super(props);
    	var currFriend = this.props.navigation.state.params.currFriend
    	var currGroup = {}
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



  	render() {
  		var pages = []

  		for(var i = 0; i < this.state.currGroup.friends.length; i++) {
  			index = i
  			pages.push(
				<View key={i} style={{width:'90%', height:'95%', borderRadius:10, backgroundColor:'#222', flexDirection:'column', alignItems:'center'}}>
			    	<Image source={this.state.currGroup.friends[i].photo} style={{width:this.state.width*0.9, height:this.state.height*0.9*0.467}}/>
			        <LinearGradient colors={['transparent', 'rgba(34,34,34,0.7)']} style={{position:'absolute', width:this.state.width*0.9, height:this.state.height*0.9*0.03, top:this.state.height*0.9*0.437}}/>
			        <Image source={this.state.currGroup.friends[i].bgFire} style={{position:'absolute', top:this.state.height*0.9*0.467, width:this.state.width*0.9, height:this.state.height*0.9*0.447, opacity:0.2}}/>
			        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:'3%'}}>
			        	<Text style={{backgroundColor:'transparent', fontWeight:'400', color:'white', fontSize:32}}>{this.state.currGroup.friends[i].name}</Text>
			        	<Image source={this.state.currGroup.friends[i].fire} style={{marginLeft:'1%', height:60, width:60, bottom:10}}/>
			       	</View>
			        {this.state.currGroup.friends[i].status?
			        	<View style={{alignItems:'center'}}>
			        		<Text style={{backgroundColor:'transparent',color:'white', fontSize:18, marginTop:'5%'}}>{this.state.currGroup.friends[i].status}</Text>
			        		<Text style={{backgroundColor:'transparent',color:'white', fontStyle:'italic', marginLeft:'50%', marginTop:'4%'}}>Posted {this.state.currGroup.friends[i].statusAge}</Text>
			        	</View>
			        	:<Text style={{backgroundColor:'transparent',color:'white', fontStyle:'italic', marginTop:'8%'}}>No recent status</Text>
			        }
			        <View style={{alignItems:'center', flexDirection:'row', position:'absolute', bottom:'10%'}}>
			        	<TouchableOpacity activeOpacity={0.25} style={{right:'50%'}} onPress={() => {this._sendTextPress(this.state.currGroup.friends[index].name, this.state.currGroup.friends[index].number)}}>
			        		<Image source={require('../../assets/icons/send-text.png')} style={{height:50, width:50, tintColor:'#fff'}}/>
			        	</TouchableOpacity>
			        	<TouchableOpacity activeOpacity={0.25} style={{left:'50%'}} onPress={() => {this._callPress(this.state.currGroup.friends[index].number)}}>
			        		<Image source={require('../../assets/icons/phone-outline.png')} style={{height:50, width:50, tintColor:'#fff'}}/>
			        	</TouchableOpacity>
			        </View>
			        <Text style={{backgroundColor:'transparent',position:'absolute', bottom:'5%', color:'white', fontStyle:'italic'}}>Last connected {this.state.currGroup.friends[i].lastConnected}</Text>
			   	</View>
			)
		}

  		return (
	  		<View style={{flex: 1, backgroundColor:'#222'}}>
				<Swiper ref="cardSwiper" loop={false} bounces={true} index={this.state.index} style={{right:'5%', left:'5%', top:'2%', bottom:'3%'}}>
					{pages}  
			    </Swiper>
			</View>
		);
	}

/* method from old prototype to load data about friend*/
  	// async componentWillMount() {
  	// 	let key = this.props.navigation.state.params.key
	  //   AsyncStorage.getItem('friends').then((list) => {
			// if (list == null) return
			// let friendsList = JSON.parse(list).allData
			// var friend = 0
			// for (var i = 0; i < friendsList.length; i++) {
			// 	if (friendsList[i].key === key) {
			// 		friend = friendsList[i];
			// 		break;
			// 	}
			// }

			// notificationsCopy = friend.notifications
			// if (notificationsCopy ) {
			// 	notificationsCopy.sort(function(a, b) { return a < b })
			// 	for (i = 0; i < notificationsCopy.length; i++) {
			// 		if (notificationsCopy[i].status === 'new') {
			// 			setTimeout(() => {this.refs.notifSwiper.scrollBy(1) }, 300)
			// 		}
			// 	}
			// } else {
			// 	notificationsCopy = []
			// }
			

			// this.setState({
			// 	name: friend.name,
			// 	photo: friend.photo,
			// 	fire: friend.fire,
			// 	currFire: friend.currFire,
			// 	lastConnected: friend.lastConnected,
			// 	lastConnectedType: friend.lastConnectedType,
			// 	notifications: notificationsCopy,
			// 	isLoading: false,
			// })
	  //   })
  	// }

/* method from old prototype from sending a text-- parts can be reused in new! */
  	// _sendTextPress = function(name) {
  	// 	OpenAnything.Text('+16502791863', 'Hey, ' + name + ' it\'s been a while since we talked! Want to meet up this week?');
  	// 	setTimeout(() => {
  	// 		notificationsCopy = []
  	// 		for (var i = 0; i < this.state.notifications.length; i++) {
  	// 			notificationsCopy.push(this.state.notifications[i]);
  	// 		}

			// notificationsCopy.sort(function(a, b) { return a > b })
			// newNotification = {
			// 	key: notificationsCopy.length + 1, 
			// 	status: 'old', 
			// 	type: 'Sent text', 
			// 	date: "Dec 8", 
			// 	description: 'You texted ' + this.state.name, 
			// 	icon: require('../../assets/icons/send-text.png'), 
			// 	tintColor: '#B7695C'
			// }
			// notificationsCopy.push(newNotification)
			// notificationsCopy.sort(function(a, b) { return a < b })			


	  // 		this.setState({
			// 	name: this.state.name,
			// 	photo: this.state.photo,
			// 	fire: this.state.fire,
			// 	currFire: this.state.currFire,
			// 	lastConnected: "today",
			// 	lastConnectedType: "You: Sent text",
			// 	notifications: notificationsCopy,
			// 	isLoading: false,
			// })

			// // SOMEHOW NEED TO UPDATE THE DB *******
			// item = {
			// 	key: this.props.navigation.state.params.key
			// }

			// this.props.navigation.state.params.update(item, "Sent text", newNotification)
  	// 	}, 500);
  	// };


/* methods from old prototype for sending high fives*/
  	// _highFivePress = function() {
  	// 	this._setModalVisible(true)
  	// };

  	// _sendHighFive = function() {
  	// 	this._setModalVisible(false)
  	// 	setTimeout(() => {
  	// 		notificationsCopy = []
  	// 		for (var i = 0; i < this.state.notifications.length; i++) {
  	// 			notificationsCopy.push(this.state.notifications[i]);
  	// 		}

			// notificationsCopy.sort(function(a, b) { return a > b })
			// newNotification = {
			// 	key: notificationsCopy.length + 1, 
			// 	status: 'old', 
			// 	type: 'High-fived', 
			// 	date: "Dec 8", 
			// 	description: 'You high-fived ' + this.state.name, 
			// 	icon: require('../../assets/icons/hand.png'), 
			// 	tintColor: '#CDBB79'
			// }
			// notificationsCopy.push(newNotification)
			// notificationsCopy.sort(function(a, b) { return a < b })

			// // UPDATE THE FIRE
		 //    if (this.state.currFire == 'dead') {
		 //      this.state.fire = require('../../assets/fires/tiny_fire.png')
		 //      this.state.currFire = 'tiny'
		 //    } else if (this.state.currFire == 'tiny') {
		 //      this.state.fire = require('../../assets/fires/small_fire.png')
		 //      this.state.currFire = 'small'
		 //    } else if (this.state.currFire == 'small') {
		 //      this.state.fire = require('../../assets/fires/medium_fire.png')
		 //      this.state.currFire = 'medium'
		 //    } else if (this.state.currFire == 'medium') {
		 //      this.state.fire = require('../../assets/fires/large_fire.png')
		 //      this.state.currFire = 'large'
		 //    }		

	  // 		this.setState({
			// 	name: this.state.name,
			// 	photo: this.state.photo,
			// 	fire: this.state.fire,
			// 	currFire: this.state.currFire,
			// 	lastConnected: "today",
			// 	lastConnectedType: 'You: High-fived',
			// 	notifications: notificationsCopy,
			// 	isLoading: false,
			// })


			// Alert.alert('Success','High five sent!');

			// // SOMEHOW NEED TO UPDATE THE DB *******

			// item = {
			// 	key: this.props.navigation.state.params.key
			// }

			// this.props.navigation.state.params.update(item, "High-fived", newNotification)
  	// 	}, 500);
  	// };



/* method from old prototype for clearing notifications*/
  	// _notificationPress = function(which) {
  	// 	notificationsCopy = this.state.notifications.slice()

  	// 	changed = false
  	// 	for (var i = 0; i < notificationsCopy.length; i++) {
  	// 		if (notificationsCopy[i].key === which) {
  	// 			notificationsCopy[i].status = 'old'
  	// 			changed = true
  	// 		}
  	// 	}

  	// 	if (!changed) {
  	// 		return;
  	// 	}

  	// 	// this.state.notifications = notificationsCopy
  	// 	this.setState({ notifications: notificationsCopy})
  	// 	this.props.navigation.state.params.notifications(this.props.navigation.state.params.key, which)
  	// };


/* method from old prototype for changing visibility of high five modal window*/
 //  	_setModalVisible = function(visible) {
 //  		var newState = this.state;
 //  		newState.modalVisible = visible;
	// 	this.setState(newState);
	// }


/*render method for old prototype*/
  // 	render() {
  // 		if (this.state.isLoading) {
	 //      return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>Loading...</Text></View>;
	 //    }
	 //    const navigation = this.props.navigation

  // 		return (
	 //  		<View style={[styles.container, {backgroundColor: '#EEEEEE'}]}>
		// 	    {/* Name and thumbnail icon */}
		// 	    <View style={styles.title}>
		// 	    	<Image source={this.state.photo} style={styles.thumbnail}/>
		// 	    	<Text numberOfLines={1} style={styles.name}>{this.state.name}</Text>
		// 	    </View>
			   

		// 		{/* Fire/Notifications swiper */}
		// 		<Swiper ref="notifSwiper" paginationStyle={{ bottom: 5}} width={300} style={styles.swiper} showsButtons={false} removeClippedSubviews={false} loop={false}>
		// 	        <View style={styles.slide}>
		// 	          <Image source={this.state.fire} style={styles.fireIcon}/>
		// 	        </View>
		// 	        <ScrollView style={styles.slideScrollView}>
		// 	        	<Text style={{fontSize: 23, textAlign: 'center', textDecorationLine: 'underline', marginBottom: 5}}>Recent Activity</Text>
		// 	        	<FlatList
		// 			      data={this.state.notifications}

		// 			      renderItem={({item}) => 
		// 		      		<TouchableHighlight  flex={3} underlayColor={'silver'} onPress={() => this._notificationPress(item.key)}>
		// 			    		<View style={styles.notification}>
		// 			    			<Image source={item.icon} style={[styles.notificationIcon, {tintColor: item.tintColor}]}/>
		// 			    			<View>
		// 								<Text style={{fontSize: 20, marginLeft: 10, fontWeight: item.status == 'new' ? '800' : 'normal', color: item.status == 'new' ? 'black' : 'black'}}>{item.description}</Text>
		// 				    			<Text style={{fontSize: 20, marginLeft: 10, fontWeight: item.status == 'new' ? '800' : 'normal', color: item.status == 'new' ? 'black' : 'black'}}>{item.date}</Text>
		// 			    			</View>
		// 			    		</View>	
		// 			    	</TouchableHighlight>}
		// 		   		/>
		// 	        </ScrollView>
			        
		// 	    </Swiper>

		// 	    <View>
		// 	    	<Text style={styles.captionText}>last connected {this.state.lastConnected}</Text>
		// 	    </View>

		// 	    <View style={styles.buttonContainer}>
		// 		    <View style={styles.iconButton}>
		// 		    	<TouchableOpacity activeOpacity={0.25} onPress={() => navigation.navigate('Schedule', {name: navigation.state.params.name, editable: false})}>
		// 		    		<Image source={require('../../assets/icons/calendar.png')} style={styles.icon}/>
		// 		    	</TouchableOpacity>
		// 		    	<Text style={styles.buttonText}>View</Text>
		// 		    	<Text style={styles.buttonText}>Schedule</Text>
		// 		    </View>

		// 		    <View style={styles.iconButton}>
		// 		    	<TouchableOpacity activeOpacity={0.25} onPress={() => {
		// 		    		const navigateAction = NavigationActions.navigate({
		// 					  routeName: 'Memories',
		// 					  params: {},
		// 					  action: NavigationActions.navigate({ routeName: 'Memories', params: {friendName: this.state.name, friendKey: this.props.navigation.state.params.key } })
		// 					})

		// 		    		navigation.dispatch(navigateAction)				    		
		// 		    		// navigation.navigate('Memories', {filterFriend: this.state.name , filterFriendKey: this.props.navigation.state.params.key})
		// 		    	}}>
		// 		    		<Image source={require('../../assets/icons/friends.png')} style={[styles.icon, {tintColor: '#51A39D'}]}/>
		// 		    	</TouchableOpacity>
		// 		    	<Text style={styles.buttonText}>Shared</Text>
		// 		    	<Text style={styles.buttonText}>Memories</Text>
		// 		    </View>

		// 		    <View style={styles.iconButton}>
		// 		    	<TouchableOpacity activeOpacity={0.25} onPress={() => this._sendTextPress(this.state.name)}>
		// 		    		<Image source={require('../../assets/icons/send-text.png')} style={[styles.icon, {tintColor: '#B7695C'}]}/>
		// 		    	</TouchableOpacity>
		// 		    	<Text style={styles.buttonText}>Send</Text>
		// 		    	<Text style={styles.buttonText}>Text</Text>
		// 		    </View>

		// 		    <View style={styles.iconButton}>
		// 		    	<TouchableOpacity activeOpacity={0.25} onPress={() => this._highFivePress()}>
		// 		    		<Image source={require('../../assets/icons/hand.png')} style={[styles.icon, {tintColor: '#CDBB79'}]}/>
		// 		    	</TouchableOpacity>
		// 		    	<Text style={styles.buttonText}>Send</Text>
		// 		    	<Text style={styles.buttonText}>High-Five</Text>
		// 		    </View>
			    	
		// 	    </View>
		// 	    <View>
		// 	        <Modal animationType="slide" transparent={false} visible={this.state.modalVisible} >
		//          		<View style={{marginTop: 20, flexDirection: 'column'}}>
		// 	         		<View style={{margin: 20, flexDirection: 'row'}}>
		// 		         		<TouchableOpacity activeOpacity={0.25} onPress={() => this._setModalVisible(false)}>
		// 				    		<Image source={require('../../assets/icons/cancel.png')} style={styles.modalCancel}/>
		// 				    	</TouchableOpacity>
		// 	         		</View>
		// 	         		<View style={{marginTop: 50, flexDirection: 'column', alignItems: 'center'}}>
		// 		         		<Text style={styles.modalText}>Give {this.state.name} a high five!</Text>
		// 		         		<TouchableOpacity activeOpacity={0.25} onPress={() => this._sendHighFive()}>
		// 				    		<Image source={require('../../assets/icons/hand.png')} style={styles.modalIcon}/>
		// 				    	</TouchableOpacity>
		// 				    	<Text style={[styles.modalText]}>tap to confirm</Text>
		// 	         		</View>
		//          		</View>

		         	
		// 	        </Modal>
		// 	    </View>
		// 	</View>
		// );
  // 	}

}


/*style sheet for old prototype*/
// const styles = StyleSheet.create({
// 	container: {  
// 		flex:1,
// 		alignItems: 'center', 
// 		justifyContent: 'center', 
// 	},

// 	title: {
// 		flexDirection: 'row',
// 		alignContent: 'flex-start',
// 		alignItems: 'flex-start',
// 		marginLeft: 30,
// 		marginTop: 20,
// 		marginBottom: 20,
// 		width: '100%',
// 	},

// 	thumbnail: {
// 		width: 100,
// 		height: 100,
// 		borderRadius: 50,
// 	},

// 	name: {
// 		fontSize: 40,
// 		color: 'dimgray',
// 		lineHeight: 100,
// 		marginLeft: 20,
// 		width: 275
// 	},

// 	swiper: {
// 	},

// 	slide: {
// 		justifyContent: 'center',
//    		alignItems: 'center',
// 	},

// 	slideScrollView: {
// 		marginTop: 20,
// 		marginBottom: 20,
// 	},

// 	fireIcon: {
// 		width: 250,
// 		height: 250,
// 	},

// 	captionText: {
// 		fontSize: 25,
// 		color: 'black',
// 		padding: 10,
// 		marginBottom: 20,
// 	},

// 	buttonContainer: {
// 		flexDirection: 'row',
// 		justifyContent: 'space-between',
// 	},

// 	iconButton: {
// 		flexDirection:'column',
// 		padding: 10,
// 		justifyContent: 'center',
//    		alignItems: 'center',
//    		marginBottom: 10,
// 	},

// 	icon: {
// 		width: 70,
// 		height: 70,
// 	},

// 	buttonText: {
// 		fontSize: 17.5,
// 		color: 'black',
// 	},

// 	notification:{
// 		borderBottomColor: 'black',
// 		borderBottomWidth: 0.5,
// 		flexDirection: 'row',
// 		width: '100%',
// 		padding: 10,
// 	},

// 	notificationIcon: {
// 		width: 40,
// 		height: 40,
// 	},

// 	notificationText: {
// 		fontSize: 20,
// 		marginLeft: 10,
// 	},

// 	modalView: {
// 		flexDirection: 'row',
// 		margin: 20,
// 	},

// 	modalText: {
// 		fontSize: 30,
// 		fontFamily: 'Avenir Next',
// 	},

// 	modalCancel: {
// 		width: 50, 
// 		height: 50,
// 	},

// 	modalIcon: {
// 		width: 175,
// 		height: 175,
// 		margin: 75,
// 		marginLeft: 65,
// 		tintColor: '#CDBB79'
// 	},

// });