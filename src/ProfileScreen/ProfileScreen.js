import React from 'react';
import { View, TextInput, Text, Image, TouchableHighlight, TouchableOpacity, AsyncStorage, Button, AlertIOS } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as firebase from 'firebase';
import {Segment, Notifications } from 'expo';
import {handleNotifications} from '../../notificationHandler.js';
import Modal from 'react-native-modalbox';


class ProfileScreen extends React.Component {



  constructor(props) {
        super(props);
        const navigation = this.props.navigation;
        Segment.identify(Expo.Constants.deviceId)
        Segment.screen("User Profile Screen")
        this.state = {
          user: {
            name: '',
            photo: require('../../assets/profilePictures/default-profile.png'),
            loggedOut: false,
            birthday: '',
            status: '',
            notifications: false,
          },
          handlerSet: false,
          editActive: false,
          statusChange: ''
        }
    }

  async componentWillMount() {
    //let userPhotos = JSON.parse(await AsyncStorage.getItem('userPhotos')) || {}
    var user = firebase.auth().currentUser;
    this.state.user.uid = user.uid
    firebase.database().ref('users').child(user.uid).once('value', (snapshot) => {
        if(snapshot.val()) {
            this.state.user.firstName = snapshot.val().firstName;
            this.state.user.lastName = snapshot.val().lastName;
            //this.state.user.birthday = snapshot.val().birthday;
            

            this.state.user.notifications = snapshot.val().notifications;
            if (!this.state.handlerSet && this.state.user.notifications) {
              this._notificationSubscription = Notifications.addListener(handleNotifications);
              //console.log("Set handler");
              this.state.handlerSet = true;
            } else if (!this.state.user.notifications && this.state.handlerSet) {
              this._notificationSubscription.remove(handleNotifications);
              this.state.handlerSet = false;
            }
            

            if(snapshot.val().photo && snapshot.val().photo.uri) {
                this.state.user.photo = snapshot.val().photo
            }

            this.setState({
                user: this.state.user,
                handlerSet: this.state.handlerSet,
                editActive: false
            });
        }

    });

    firebase.database().ref('users').child(user.uid).child('status').on('value', (snapshot) => {
        if(snapshot.val()) {
            this.state.user.status = snapshot.val();
            this.setState({user: this.state.user})
        }
    })
  }

  //componentDidMount() {this.setupListener();}
  componentWillUnmount() {
    //console.log("Unmounting");
    if (this.state.handlerSet) this._notificationSubscription.remove(handleNotifications);
    firebase.database().ref('users').child(this.state.user.uid).off('value');
    this.setState({
      handlerSet: false
    });
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
    //console.log(birthday)


    }
  }

  onSave = user => {
    this.setState({user: user});
  };

  /*
  resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
      scrollEnabled={false}
      */

// setStatusStyle() {
//   distStr = this.state.editActive ? 'none' : 'flex';
//   return {
//     marginTop:'5%',
//     width: 275,
//     flexDirection: 'row',
//     alignItems: 'center',
//     display: distStr
//   }
// }

setEditorStyle() {
  distStr = !this.state.editActive ? 'none' : 'flex';
  return {
    marginTop:'5%',
    color:'white',
    width: 300,
    fontSize:20,
    display: distStr
  }
}

resetModal() {
  this.setState({
    editActive: false,
    statusChange: ''
  });
}

setStatus(text) {
  firebase.database().ref('users').child(this.state.user.uid).child('status').set(text);
  firebase.database().ref('users').child(this.state.user.uid).child('statusPosted').set(Date.now());
  this.resetModal();
}



/*render method for new prototype*/
  render() {
    const navigation = this.props.navigation;
    return (
      <View
      style={{ flex: 1, flexDirection:'column', backgroundColor: '#333', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Image source = {this.state.user.photo} style = {{marginTop:'5%', height:150, width:150, borderRadius:150/2}}/>

        <View style={{paddingTop: 15, flexDirection:'row', alignItems: 'center'}}>
          <Text style = {{fontSize:32, color:'white'}}>{this.state.user.firstName} {this.state.user.lastName}</Text>
          <TouchableOpacity activeOpacity={0.25}
          onPress={() => {
            Segment.track("Clicked Settings");
            navigation.navigate('Settings', {})}}>
            <Image source={require('../../assets/icons/settings.png')} style={{height:20, width:20, tintColor:'white', marginLeft:10}}/>
          </TouchableOpacity>
        </View>
        {/*<Text style = {{fontSize:24, color:'white'}}>Birthday: {this.state.user.birthday}</Text>*/}
        <TouchableOpacity activeOpacity={0.25} onPress={this.logInFB.bind(this)}>
          <View style={this.state.user.loggedOut ? {flexDirection:'row', alignItems:'center', marginTop:20} : {display:'none'}}>
            <Image source={require('../../assets/icons/facebook.png')} style={{height:20, width:20, marginRight:15}}/>
            <Text  style={{fontSize:18, color:'white', textDecorationLine:'underline'}}>Connect Account</Text>
          </View>
        </TouchableOpacity>
        <View style={{marginTop: 25, alignItems: 'center'}}>
        <Text style = {{fontSize:20, color:'white'}}>"{this.state.user.status}"</Text>
        {
          /*
        <TouchableOpacity 
        onPress={() => {
          Segment.track("Clicked Edit Status")
          this.setState({
            editActive: true
          });
          AlertIOS.prompt(
            'Change Status',
            'Enter a new status message so your connections know what to talk to you about!',
            [
              {
                text: 'Cancel',
                style: 'cancel'
              },
              {
                text: 'Change',
                onPress: (text) =>  this.setStatus(text)
              }
            ]);
        }}>
        <View style={{marginTop: 20, borderWidth: 1, borderColor: 'white', borderRadius: 8, padding: 5}}>
          <Text style={{backgroundColor:'transparent', color: 'white'}}>Update status</Text>
        </View>

        {/* <Image source={require('../../assets/icons/edit.png')} style={{height:20, width:20, tintColor:'white', marginLeft:10}}/> 
        </TouchableOpacity> */
      }
        <TouchableOpacity 
        onPress={() => {
          this.refs.modal1.open();
        }}>
        <View style={{marginTop: 20, borderWidth: 1, borderColor: 'white', borderRadius: 8, padding: 5}}>
          <Text style={{backgroundColor:'transparent', color: 'white'}}>Update Status</Text>
        </View>
        </TouchableOpacity>
        {/*
        <Modal
          visible={this.state.editActive}
          animation={'slide'}
          presentationStyle={'formSheet'}>
          <View style={{flex:0, alignItems:'center', padding: 20}}>
            <TextInput
              autogrow={true}
              multiline={true}
              placeholder="Enter a status"
              onChangeText={(text) => this.setState({statusChange:text})}
              />
            <Button
              title='Change'
              onPress={() => this.setStatus()}>
            </Button>
            <Button
              title='Cancel'
              onPress={() => this.resetModal()}>
            </Button>
          </View>
        </Modal>
      */}
        {/*
        <TextInput
                autogrow={true}
                multiline={true}
                style={this.setEditorStyle()}
                placeholder="Enter a status"
                placeholderTextColor="#aaa"
                onSubmitEditing={(event) => {
                    firebase.database().ref('users/test/status').set(event.nativeEvent.text);
                }}
                returnKeyType='done'
            />
            */
          }
        </View>
        <Modal
          style={{width:300, height:300}}
          position={'center'}
          ref={'modal1'}>
          <Text
            style={{margin:10, fontSize:20}}>Update Status</Text>
          <TextInput
            backgroundColor='#eee'
            style={{margin:15, padding: 15, borderWidth:1, height: 100, fontSize: 16}}
            multiline={true}
            autoGrow={false}
            maxHeight={100}
            placeholder="Enter a status"
            onChangeText={(text) => {this.setState({statusChange: text});}}/>
            {
            <View
            style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                if (this.state.statusChange.length > 0) {
                  this.setStatus(this.state.statusChange);
                  this.refs.modal1.close();
                }
              }}>
              <View style={{margin: 20, borderWidth: 1, borderColor: 'black', borderRadius: 8, padding: 5}}>
                <Text style={{backgroundColor:'transparent', color: 'black'}}>Update</Text>
              </View></TouchableOpacity>
              <TouchableOpacity
              onPress={() => {
                this.resetModal();
                this.refs.modal1.close();
              }}><View style={{margin: 20, borderWidth: 1, borderColor: 'black', borderRadius: 8, padding: 5}}>
                <Text style={{backgroundColor:'transparent', color: 'black'}}>Cancel</Text>
              </View></TouchableOpacity>
            </View>
          }
        </Modal>
      </View>
    );
  }



}

export default ProfileScreen;
