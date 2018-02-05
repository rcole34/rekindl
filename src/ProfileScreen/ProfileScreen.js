import React from 'react';
import { View, TextInput, Text, Image, TouchableHighlight, TouchableOpacity } from 'react-native';


class ProfileScreen extends React.Component {

  

  constructor(props) {
        super(props);
        const navigation = this.props.navigation;
        this.state = {user: {name: 'Michael West', photo: require('../../assets/profilePictures/mike.png'),  loggedOut: true, birthday: 'December 5, 1996', status: ''}}
    }


      async logInFB() {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('575341286140281', {
      permissions: ['public_profile'],
    });
  if (type === 'success') {
    // Get the user's name using Facebook's Graph API
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,birthday,picture.type(large)`);
    const data = (await response.json())
    const username = data.name
    const userphoto = data.picture
    const birthday = data.birthday
    //this.state.user.photo = {uri: userphoto.data.url}
    //this.state.user.name = username
    const user = Object.assign({}, this.state.user, { name: username, photo: {uri: userphoto.data.url}, birthday: birthday, loggedOut: false}); 
                    this.setState({ user });
    console.log(birthday)
    

    }
  }

/*idk what this was doing tbh but i don't think we need it any more*/
  // static navigationOptions = {
  //   tabBarLabel: 'Profile',
  //   tabBarIcon: ({ tintColor }) => {
  //     return <Image
  //       source={require('../../assets/profilePictures/mike.png')}
  //       style={[{width: 26, height: 26}, {tintColor: tintColor}]}/>
  //   },
  // };

  onSave = user => {
    this.setState({user: user});
  };

/*render method for new prototype*/
  render() {
    const navigation = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection:'column' }}>
        <Image source = {this.state.user.photo} style = {{height:150, width:150, borderRadius:150/2}}/>
        
        <View style={{flexDirection:'row', alignItems: 'center'}}>
          <Text style = {{fontSize:48, color:'#444'}}>{this.state.user.name}</Text>
          <TouchableHighlight underlayColor='rgba(200,200,200,0.8)'
          onPress={() => navigation.navigate('Settings', {})}>
            <Image source={require('../../assets/icons/settings.png')} style={{height:30, width:30, tintColor:'#555', marginLeft:10}}/>
          </TouchableHighlight>
        </View>
        <Text style = {{fontSize:24, color:'#666'}}>Birthday: {this.state.user.birthday}</Text>
        <TouchableOpacity activeOpacity={0.25} onPress={this.logInFB.bind(this)}>
          <View style={this.state.user.loggedOut ? {flexDirection:'row', alignItems:'center', marginTop:20} : {display:'none'}}> 
            <Image source={require('../../assets/icons/facebook.png')} style={{height:20, width:20, marginRight:15}}/>
            <Text  style={{fontSize:18, color:'#555', textDecorationLine:'underline'}}>Connect Account</Text>
          </View>
        </TouchableOpacity>
        <TextInput
                style={{textAlign:'center', color:'#666', height: 64, fontSize:24}}
                autoCapitalize='words'
                placeholder="Enter a status"
                value={this.state.user.status}
                onChangeText={(text) => {
                    const user = Object.assign({}, this.state.user, { status: text }); 
                    this.setState({ user });
                }}
                returnKeyType='done'
            />
      </View>
    );
  }


/*render method for old prototype*/
  // render() {
  //   const navigation = this.props.navigation;
  //   return (
  //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection:'column' }}>
  //       <Image source = {this.state.user.photo} style = {{height:150, width:150, borderRadius:150/2}}/>
        
  //       <View style={{flexDirection:'row', alignItems: 'center'}}>
  //         <Text style = {{fontSize:48, color:'#444'}}>{this.state.user.name}</Text>
  //         <TouchableHighlight underlayColor='rgba(200,200,200,0.8)'
  //         onPress={() => navigation.navigate('EditProfile', {user: this.state.user, onSave: this.onSave})}>
  //           <Image source={require('../../assets/icons/edit.png')} style={{height:30, width:30, tintColor:'#555', marginLeft:10}}/>
  //         </TouchableHighlight>
  //       </View>
  //       <Text style = {{fontSize:24, color:'#666'}}>Birthday: {this.state.user.birthday}</Text>
  //       <TouchableHighlight underlayColor='rgba(200,200,200,0.8)'>
  //         <View style={{flexDirection:'row', alignItems:'center', marginTop:20}}>
  //           <Image source={require('../../assets/icons/facebook.png')} style={{height:20, width:20, marginRight:15}}/>
  //           <Text onPress={this.logInFB.bind(this)} style={{fontSize:18, color:'#555', textDecorationLine:'underline'}}>Connect Account</Text>
  //         </View>
  //       </TouchableHighlight>
  //       <TouchableHighlight underlayColor='rgba(200,200,200,0.8)'
  //       onPress={() => navigation.navigate('Schedule', {name: this.state.user.name, editable: true})}> 
  //         <View style={{flexDirection: 'column', alignItems:'center', justifyContent:'center', marginTop:20}}>
  //           <Image source={require('../../assets/icons/calendar.png')} style={{height:80, width:76, marginBottom:5}}/>
  //           <Text style={{fontSize:18, color:'#444'}}>Update Schedule</Text>
  //         </View>
  //       </TouchableHighlight>
  //     </View>
  //   );
  // }
}

export default ProfileScreen;
