import React from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, Switch } from 'react-native';

// name accessed via {navigation.state.params.name}

export default class FriendScheduleScreen extends React.Component {
	constructor(props) {
    	super(props);
    	this.data = Array(7);
    	this.editable = props.navigation.state.params.editable;
    	if (!this.editable) {
    		this.frienddata = Array(7)
    	}

    	for (var i = this.data.length - 1; i >= 0; i--) {
    		this.data[i] = Array(24);
    		if (!this.editable) {
	    		this.frienddata[i] = Array(24)
	    	}
    		for (var j = this.data[i].length - 1; j >= 0; j--) {
    			time = j/2 + 9.00;
    			this.data[i][j] = {key: j, time: (time % 12 || 12) + (time < 12 && time >= 9 ? "am" : "pm"), isFree: Math.random() >= 0.40};
    			if (!this.editable) {
    				this.frienddata[i][j] = {isFree: Math.random() >= 0.40};
		    	}
    		}
    	}

    	this.state = {showMySchedule: false, pressed: 0, calendar: this.data[0], friendcalendar: !this.editable ? this.frienddata[0] : undefined};

  	}

  	toggleTimeBlock = function(item) {
  		if (!this.props.navigation.state.params.editable) return;
  		var tempCal = this.state.calendar.slice();
    	tempCal[item.key].isFree = !tempCal[item.key].isFree;    	
    	this.data[this.state.pressed] = tempCal;
    	this.setState({calendar: tempCal});
  	}

  	changeDay = function(pressedNum) {
    	this.setState({pressed: pressedNum || 0, calendar: this.data[pressedNum], friendcalendar: !this.editable ? this.frienddata[pressedNum] : undefined});
  	}

  	getBlockStyle(key) {
  		if (this.editable) {
  			return this.state.calendar[key].isFree ? style.freeBlock : style.busyBlock;
  		} else if (this.state.showMySchedule) {
  			// return this.state.calendar[key].isFree && this.state.friendcalendar[key].isFree ? style.mutualFreeBlock : style.busyBlock;

			if (this.state.calendar[key].isFree) {
  				return this.state.friendcalendar[key].isFree ? style.mutualFreeBlock : style.busyBlock;
  			} else {
  				return this.state.friendcalendar[key].isFree ? style.friendFreeBlock : style.busyBlock;
  			}
  		} else {
			return this.state.friendcalendar[key].isFree ? style.friendFreeBlock : style.busyBlock;
		}
  	}

  	toggleScheduleShow = function() {
  		this.setState({showMySchedule: !this.state.showMySchedule, calendar: this.state.calendar.slice()});
  	}

  	render() {
  		const navigation = this.props.navigation;
  		return (
	  		<View style={style.mainContainer}>
	  			<View style={style.headerButtonContainer} >
	  				<TouchableOpacity style={this.state.pressed === 0 ? style.headerButtonSelected : style.headerButton} onPress={() => this.changeDay(0)} underlayColor='#fff'>
						<Text style={style.headerButtonText}>S</Text>
					</TouchableOpacity>
					<TouchableOpacity style={this.state.pressed === 1 ? style.headerButtonSelected : style.headerButton} onPress={() => this.changeDay(1)} underlayColor='#fff'>
						<Text style={style.headerButtonText}>M</Text>
					</TouchableOpacity>
					<TouchableOpacity style={this.state.pressed === 2 ? style.headerButtonSelected : style.headerButton} onPress={() => this.changeDay(2)} underlayColor='#fff'>
						<Text style={style.headerButtonText}>T</Text>
					</TouchableOpacity>
					<TouchableOpacity style={this.state.pressed === 3 ? style.headerButtonSelected : style.headerButton} onPress={() => this.changeDay(3)} underlayColor='#fff'>
						<Text style={style.headerButtonText}>W</Text>
					</TouchableOpacity>
					<TouchableOpacity style={this.state.pressed === 4 ? style.headerButtonSelected : style.headerButton} onPress={() => this.changeDay(4)} underlayColor='#fff'>
						<Text style={style.headerButtonText}>T</Text>
					</TouchableOpacity>
					<TouchableOpacity style={this.state.pressed === 5 ? style.headerButtonSelected : style.headerButton} onPress={() => this.changeDay(5)} underlayColor='#fff'>
						<Text style={style.headerButtonText}>F</Text>
					</TouchableOpacity>
					<TouchableOpacity style={this.state.pressed === 6 ? style.headerButtonSelected : style.headerButton} onPress={() => this.changeDay(6)} underlayColor='#fff'>
						<Text style={style.headerButtonText}>S</Text>
					</TouchableOpacity>
	  			</View>
	  			{!this.editable && 
	  				// <Button style={style.scheduleToggle} title={this.state.showMySchedule ? 'Hide shared free time' : 'Show shared free time'} onPress={() => this.toggleScheduleShow()} />
	  				<View style={style.scheduleToggleContainer} >
	  					<Switch style={style.scheduleToggle} value={this.state.showMySchedule} onValueChange={() => this.toggleScheduleShow()} />
	  					<Text style={style.scheduleToggleText} > Highlight Shared Free Time </Text>
	  				</View>
	  			}
	  			{this.editable && <Text style={style.freetimeHeader}> Mark Your Free Times </Text>}
			    <FlatList
			    	data={this.state.calendar}
			    	style={style.calendarContainer}
			      	renderItem={({item}) =>
			      		<View style={style.calendarRowContainer}>
			      			<Text style={style.calendarLabel}> {item.key % 2 ? null : item.time } </Text>
				      		<TouchableOpacity underlayColor={'#FFF'} activeOpacity={this.props.navigation.state.params.editable ? 0.5 : 1} onPress={() => this.toggleTimeBlock(item)} style={this.getBlockStyle(item.key)}>
					    		<Text />
					    	</TouchableOpacity>
					    </View>
				    }
				/>
			</View>
		);
  	}

}

const style = StyleSheet.create({
	headerButtonContainer: {
		width: '100%',
		height: '10%',
		flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
	},
	mainContainer: {
		flex: 1,
		flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
	},
	headerButton:{
	    backgroundColor: '#CCCCCC',
		width: '13%',
		height: '13%',
		marginLeft: 1,
		marginRight: 1,
	},
	headerButtonSelected:{
	    backgroundColor: '#777777',
		width: '13%',
		height: '13%',
		marginLeft: 1,
		marginRight: 1,
	},
	headerButtonText:{
		color:'#fff',
		textAlign:'center',
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 10,
		paddingBottom: 10,
		fontSize: 20,
	},
	calendarContainer:{
		marginTop: 15,
		width: '90%',
		height: '100%',
	},
	calendarRowContainer:{
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	freeBlock:{
		height: 30,
		backgroundColor:'lightblue',
		width: '85%',
		borderColor: 'gray',
		borderBottomWidth: 1,
	},
	friendFreeBlock:{
		height: 30,
		backgroundColor:'#ffb699',
		width: '85%',
		borderColor: 'gray',
		borderBottomWidth: 1,
	},
	mutualFreeBlock:{
		height: 30,
		backgroundColor:'#ff6d33',
		width: '85%',
		borderColor: 'gray',
		borderBottomWidth: 1,
	},
	busyBlock:{
		height: 30,
		backgroundColor:'white',
		width: '85%',
		borderColor: 'gray',
		borderBottomWidth: 1,
	},
	calendarLabel: {
		height: 30,
		width: '15%',
	},
	freetimeHeader: {
		fontSize: 25,
		color: '#222222',
		marginTop: 25,
		paddingLeft: '15%',
	},
	scheduleToggleText: {
		marginLeft: 10,
	},
	scheduleToggleContainer: {
		marginTop: 25,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	}
});