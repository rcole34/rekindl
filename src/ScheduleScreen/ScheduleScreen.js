import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// name accessed via {navigation.state.params.name}

export default class FriendScheduleScreen extends React.Component {
	constructor(props) {
    	super(props);
    	this.calendar = props.navigation.state.params.calendar;
  	}

  	render() {
  		const navigation = this.props.navigation;
  		return (
	  		<View>
			    <Text> Schedule </Text>
			</View>
		);
  	}

}

const styles = StyleSheet.create({
	example: {
		width: 175,
		height: 175,
		margin: 75,
		marginLeft: 65,
	},

});