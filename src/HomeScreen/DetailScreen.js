import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableHighlight, ScrollView, FlatList } from 'react-native';
import Swiper from 'react-native-swiper';

// name accessed via {navigation.state.params.name}

function schedulePress() {

};

function memoriesPress() {

};

function sendTextPress() {

};

function highFivePress() {

};


const DetailScreen = ({navigation}) => (
  <View style={styles.container}>
    {/* Name and thumbnail icon */}
    <View style={styles.title}>
    	<Image source={require('../../assets/images/john.png')} style={styles.thumbnail}/>
    	<Text style={styles.name}>John Snow</Text>
    </View>
   

	{/* Fire/Notifications swiper */}
	<Swiper paginationStyle={{ bottom: 5}} width={300} style={styles.swiper} showsButtons={false} removeClippedSubviews={false}>
        <View style={styles.slide}>
          <Image source={require('../../assets/icons/large_fire.png')} style={styles.fireIcon}/>
        </View>
        <ScrollView style={styles.slideScrollView}>
	        <View style={styles.slide}>
	        	<FlatList
			      data={[
			        {key: '1', extra: 'Notification'},
			        {key: '2', extra: 'Notification'},
			        {key: '3', extra: 'Notification'},
			        {key: '4', extra: 'Notification'},
			        {key: '5', extra: 'Notification'},
			        {key: '6', extra: 'Notification'},
			        {key: '7', extra: 'Notification'},
			        {key: '8', extra: 'Notification'},
			        {key: '9', extra: 'Notification'},
			        {key: '10', extra: 'Notification'},
			      ]}
			      renderItem={({item}) => 
			      		<TouchableHighlight style={styles.notification} underlayColor={'silver'} onPress={schedulePress}>
				    		<View >
				    			<Image source={require('../../assets/icons/calendar-black.png')} style={styles.icon}/>
				    		</View>	
				    	</TouchableHighlight>}
			    />
	        </View>
        </ScrollView>
        
    </Swiper>

    <View>
    	<Text style={styles.captionText}>last connected 1 week ago</Text>
    </View>

    <View style={styles.buttonContainer}>
	    <View style={styles.iconButton}>
	    	<TouchableHighlight underlayColor={'silver'} onPress={schedulePress}>
	    		<Image source={require('../../assets/icons/calendar-black.png')} style={styles.icon}/>
	    	</TouchableHighlight>
	    	<Text style={styles.buttonText}>Schedule</Text>
	    </View>

	    <View style={styles.iconButton}>
	    	<TouchableHighlight underlayColor={'silver'} onPress={memoriesPress}>
	    		<Image source={require('../../assets/icons/memories-black.png')} style={styles.icon}/>
	    	</TouchableHighlight>
	    	<Text style={styles.buttonText}>Memories</Text>
	    </View>

	    <View style={styles.iconButton}>
	    	<TouchableHighlight underlayColor={'silver'} onPress={sendTextPress}>
	    		<Image source={require('../../assets/icons/send-text-black.png')} style={styles.icon}/>
	    	</TouchableHighlight>
	    	<Text style={styles.buttonText}>Send Text</Text>
	    </View>

	    <View style={styles.iconButton}>
	    	<TouchableHighlight underlayColor={'silver'} onPress={highFivePress}>
	    		<Image source={require('../../assets/icons/hand-black.png')} style={styles.icon}/>
	    	</TouchableHighlight>
	    	<Text style={styles.buttonText}>High Five</Text>
	    </View>
    	
    </View>

  </View>
);


const styles = StyleSheet.create({
	container: {  
		flex:1,
		alignItems: 'center', 
		justifyContent: 'center', 
		backgroundColor: 'whitesmoke'
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
		backgroundColor: '#f1f1f1',
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
		color: 'dimgray',
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
		color: 'dimgray',
	},

	notification:{
		width: '100%',
	},
});

export default DetailScreen;