import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';

var user = {name: 'Michael West', photo: require('../../assets/profilePictures/mike.png'), birthMonth: 'December', birthDay: 5};

class ProfileScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) => {
      return <Image
        source={require('../../assets/icons/profile.png')}
        style={[{width: 26, height: 26}, {tintColor: tintColor}]}
      />
    },
  };



  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection:'column' }}>
        <Image source = {user.photo} style = {{height:150, width:150}}/>
        <View style={{flexDirection:'row', alignItems: 'center'}}>
          <Text style = {{fontSize:48, color:'#444'}}>{user.name}</Text>
          <TouchableHighlight underlayColor='rgba(200,200,200,0.8)'
          onPress={() => navigate('EditProfile', user)}>
            <Image source={require('../../assets/icons/edit.png')} style={{height:30, width:30, tintColor:'#555', marginLeft:10}}/>
          </TouchableHighlight>
        </View>
        <Text style = {{fontSize:24, color:'#666'}}>Birthday: {user.birthMonth} {user.birthDay}</Text>
        <TouchableHighlight underlayColor='rgba(200,200,200,0.8)'>
          <View style={{flexDirection:'row', alignItems:'center', marginTop:20}}>
            <Image source={require('../../assets/icons/facebook.png')} style={{height:20, width:20, marginRight:15}}/>
            <Text style={{fontSize:18, color:'#555', textDecorationLine:'underline'}}>Connect Account</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor='rgba(200,200,200,0.8)'
        onPress={() => navigate('Schedule', user)}> 
          <View style={{flexDirection: 'column', alignItems:'center', justifyContent:'center', marginTop:20}}>
            <Image source={require('../../assets/icons/calendar.png')} style={{height:80, width:76, marginBottom:5}}/>
            <Text style={{fontSize:18, color:'#444'}}>Update Schedule</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default ProfileScreen;
