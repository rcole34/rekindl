import React from 'react';
import { Alert, View, Text, Button, StyleSheet, Image, TouchableHighlight, ScrollView, FlatList, Modal, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import * as OpenAnything from 'react-native-openanything';

// name accessed via {navigation.state.params.name}

export default class DetailScreen extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {modalVisible: false};
  	}

  	_schedulePress = function() {

  	};

  	_sendTextPress = function(name) {
  		OpenAnything.Text('+18326460004', 'Hey, ' + name + ' it\'s been a while since we talked! Want to meet up this week?');
  	};

  	_highFivePress = function() {
  		this._setModalVisible(true)
  	};

  	_sendHighFive = function() {
  		this._setModalVisible(false)
  		setTimeout(() => {
			Alert.alert('Success','High five sent!');
  		}, 500);
  	};

  	_notificationPress = function() {

  	};

  	_setModalVisible = function(visible) {
  		var newState = this.state;
  		newState.modalVisible = visible;
		this.setState(newState);
	}

  	render() {
  		const navigation = this.props.navigation;
  		return (
	  		<View style={[styles.container, {backgroundColor: '#EEEEEE'}]}>
			    {/* Name and thumbnail icon */}
			    <View style={styles.title}>
			    	<Image source={navigation.state.params.photo} style={styles.thumbnail}/>
			    	<Text style={styles.name}>{navigation.state.params.name}</Text>
			    </View>
			   

				{/* Fire/Notifications swiper */}
				<Swiper paginationStyle={{ bottom: 5}} width={300} style={styles.swiper} showsButtons={false} removeClippedSubviews={false} loop={false}>
			        <View style={styles.slide}>
			          <Image source={navigation.state.params.fire} style={styles.fireIcon}/>
			        </View>
			        <ScrollView style={styles.slideScrollView}>
			        	<FlatList
					      data={[
					      	{key: '1', icon: require('../../assets/icons/dead_fire.png'),  message: 'Your fire with Ella is out!', date: 'Dec 5', status: 'new'},
					      	{key: '2', icon: require('../../assets/icons/friends.png'), tintColor: '#51A39D', message: 'Ella added a memory', date: 'Nov 3', status: 'checked'},
					        {key: '3', icon: require('../../assets/icons/calendar.png'), tintColor: '#814374', message: 'You and Ella met up', date: 'Oct 25', status: 'checked'},
					      	{key: '4', icon: require('../../assets/icons/friends.png'), tintColor: '#51A39D', message: 'Ella added a memory', date: 'Oct 24', status: 'checked'},
					      	{key: '5', icon: require('../../assets/icons/hand.png'), tintColor: '#CDBB79', message: 'Ella high fived you!', date: 'Oct 17', status: 'checked'},
					      	{key: '6', icon: require('../../assets/icons/hand.png'), tintColor: '#CDBB79', message: 'Ella high fived you!', date: 'Oct 3', status: 'checked'},
					      ]}

					      renderItem={({item}) => 
				      		<TouchableHighlight  flex={3} underlayColor={'silver'} onPress={this._notificationPress}>
					    		<View style={styles.notification}>
					    			<Image source={item.icon} style={[styles.notificationIcon, {tintColor: item.tintColor}]}/>
					    			<View>
										<Text style={{fontSize: 20, marginLeft: 10, fontWeight: item.status == 'new' ? '800' : 'normal', color: item.status == 'new' ? 'black' : 'black'}}>{item.message}</Text>
						    			<Text style={{fontSize: 20, marginLeft: 10, fontWeight: item.status == 'new' ? '800' : 'normal', color: item.status == 'new' ? 'black' : 'black'}}>{item.date}</Text>
					    			</View>
					    		</View>	
					    	</TouchableHighlight>}
				   		/>
			        </ScrollView>
			        
			    </Swiper>

			    <View>
			    	<Text style={styles.captionText}>last connected {navigation.state.params.lastConnected}</Text>
			    </View>

			    <View style={styles.buttonContainer}>
				    <View style={styles.iconButton}>
				    	<TouchableOpacity activeOpacity={0.25} onPress={this._schedulePress}>
				    		<Image source={require('../../assets/icons/calendar.png')} style={[styles.icon, {tintColor: '#814374'}]}/>
				    	</TouchableOpacity>
				    	<Text style={styles.buttonText}>View</Text>
				    	<Text style={styles.buttonText}>Schedule</Text>
				    </View>

				    <View style={styles.iconButton}>
				    	<TouchableOpacity activeOpacity={0.25} onPress={this._memoriesPress}>
				    		<Image source={require('../../assets/icons/friends.png')} style={[styles.icon, {tintColor: '#51A39D'}]}/>
				    	</TouchableOpacity>
				    	<Text style={styles.buttonText}>Shared</Text>
				    	<Text style={styles.buttonText}>Memories</Text>
				    </View>

				    <View style={styles.iconButton}>
				    	<TouchableOpacity activeOpacity={0.25} onPress={() => this._sendTextPress(navigation.state.params.name)}>
				    		<Image source={require('../../assets/icons/send-text.png')} style={[styles.icon, {tintColor: '#B7695C'}]}/>
				    	</TouchableOpacity>
				    	<Text style={styles.buttonText}>Send</Text>
				    	<Text style={styles.buttonText}>Text</Text>
				    </View>

				    <View style={styles.iconButton}>
				    	<TouchableOpacity activeOpacity={0.25} onPress={() => this._highFivePress()}>
				    		<Image source={require('../../assets/icons/hand.png')} style={[styles.icon, {tintColor: '#CDBB79'}]}/>
				    	</TouchableOpacity>
				    	<Text style={styles.buttonText}>Send</Text>
				    	<Text style={styles.buttonText}>High-Five</Text>
				    </View>
			    	
			    </View>
			    <View>
			        <Modal animationType="slide" transparent={false} visible={this.state.modalVisible} >
		         		<View style={{marginTop: 20, flexDirection: 'column'}}>
			         		<View style={{margin: 20, flexDirection: 'row'}}>
				         		<TouchableOpacity activeOpacity={0.25} onPress={() => this._setModalVisible(false)}>
						    		<Image source={require('../../assets/icons/cancel.png')} style={styles.modalCancel}/>
						    	</TouchableOpacity>
			         		</View>
			         		<View style={{marginTop: 50, flexDirection: 'column', alignItems: 'center'}}>
				         		<Text style={styles.modalText}>Give {navigation.state.params.name} a high five!</Text>
				         		<TouchableOpacity activeOpacity={0.25} onPress={() => this._sendHighFive()}>
						    		<Image source={require('../../assets/icons/hand.png')} style={styles.modalIcon}/>
						    	</TouchableOpacity>
						    	<Text style={[styles.modalText]}>tap to confirm</Text>
			         		</View>
		         		</View>

		         	
			        </Modal>
			    </View>
			</View>
		);
  	}

}

const styles = StyleSheet.create({
	container: {  
		flex:1,
		alignItems: 'center', 
		justifyContent: 'center', 
	},

	title: {
		flexDirection: 'row',
		alignContent: 'flex-start',
		alignItems: 'flex-start',
		marginLeft: 30,
		marginTop: 20,
		marginBottom: 20,
		width: '100%',
	},

	thumbnail: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},

	name: {
		fontSize: 40,
		color: 'dimgray',
		lineHeight: 100,
		marginLeft: 20
	},

	swiper: {
	},

	slide: {
		justifyContent: 'center',
   		alignItems: 'center',
	},

	slideScrollView: {
		marginTop: 20,
		marginBottom: 20,
	},

	fireIcon: {
		width: 250,
		height: 250,
	},

	captionText: {
		fontSize: 25,
		color: 'black',
		padding: 10,
		marginBottom: 20,
	},

	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	iconButton: {
		flexDirection:'column',
		padding: 10,
		justifyContent: 'center',
   		alignItems: 'center',
   		marginBottom: 10,
	},

	icon: {
		width: 70,
		height: 70,
	},

	buttonText: {
		fontSize: 17.5,
		color: 'black',
	},

	notification:{
		borderBottomColor: 'black',
		borderBottomWidth: 0.5,
		flexDirection: 'row',
		width: '100%',
		padding: 10,
	},

	notificationIcon: {
		width: 40,
		height: 40,
	},

	notificationText: {
		fontSize: 20,
		marginLeft: 10,
	},

	modalView: {
		flexDirection: 'row',
		margin: 20,
	},

	modalText: {
		fontSize: 30,
		fontFamily: 'Avenir Next',
	},

	modalCancel: {
		width: 50, 
		height: 50,
	},

	modalIcon: {
		width: 175,
		height: 175,
		margin: 75,
		marginLeft: 65,
	},

});