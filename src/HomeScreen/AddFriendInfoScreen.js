import React from 'react';
import { TouchableWithoutFeedback, Animated, StatusBar, TextInput, Picker, Alert, View, Text, Button, StyleSheet, Image, TouchableHighlight, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { ImagePicker } from 'expo';
import { NavigationActions } from 'react-navigation'
import {Segment } from 'expo'
import firebase from '../../firebase.js'

class FloatingLabelInput extends React.Component {

  


  state = {
    isFocused: false,
  };

  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
  }

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
      duration: 200,
    }).start();
  }

  render() {
    const { label, ...props } = this.props;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 0],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 14],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaa', '#fff'],
      }),
    };
    return (
      <View style={{ paddingTop: 18 }}>
        <Animated.Text style={labelStyle}>
          {label}
        </Animated.Text>
        <TextInput
          {...props}
          style={{ height: 26, fontSize: 20, color: '#fff', borderBottomWidth: 1, borderBottomColor: '#555' }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
        />
      </View>
    );
  }
}

class AddFriendInfoScreen extends React.Component {
    constructor(props) {

    super(props);
    this.state = {value: '', newFriend:{firstName:null, lastName: null , photo:require('../../assets/profilePictures/default-profile.png'), phone:null, category: 'weekFriend'}};
    Segment.identify(Expo.Constants.deviceId)
    Segment.screen("Add A Friend Info Screen")
  }

  static navigationOptions = ({navigation}) => ({
        headerRight: 
            <TouchableWithoutFeedback onPress={() => {

                if(navigation.state.params.newFriend.lastName != null && navigation.state.params.newFriend.firstName != null && navigation.state.params.newFriend.phone != null && navigation.state.params.newFriend.lastName != '' && navigation.state.params.newFriend.firstName != '' && navigation.state.params.newFriend.phone != ''){
                    navigation.state.params.onSave(navigation.state.params.newFriend);
                    Segment.track("Added a Friend");
                    navigation.navigate('Home');
                  } else {
                     Segment.track("Failed to Add a Friend - Missing Fields");
                     Alert.alert('Please fill out all fields');
                   }
                }}>
                    <View><Text style={{color: '#f1f1f1', marginRight: 15, marginBottom: 5, fontSize:18}}>Add</Text></View>
            </TouchableWithoutFeedback>,
    })


  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

    if (!result.cancelled) {
        type = "image/"
        endIndex = result.uri.lastIndexOf('.')
        if(endIndex === -1) {
            type += 'jpg'
        }
        else {
            type += result.uri.substring(endIndex + 1)
        }
        const newFriend = Object.assign({}, this.props.navigation.state.params.newFriend, {photo: {uri: 'data:'+type+';base64,'+result.base64} }); 
        this.props.navigation.setParams({ newFriend });
    }
  };
  
  

  handleTextChange = (newText) => this.props.navigation.setParams({ value: newText });

  render() {
    const navigation = this.props.navigation;
    return (
      <View style={{ flex: 1, padding: 40, backgroundColor: '#333' }}>
      <TouchableHighlight underlayColor='rgba(200,200,200,0.8)' style= {{height:150, width:150, borderRadius:150/2, marginBottom:20}} onPress = {() => {
        Segment.track("Clicked to Select Photo for a Friend")
        this._pickImage()}}>
                <Image source = {navigation.state.params.newFriend.photo} style = {{alignItems: 'center', justifyContent: 'center', height:150, width:150, borderRadius:150/2}}>
                    <View style={{alignItems: 'center', justifyContent: 'center', height:150, width:150, borderRadius:150/2, backgroundColor:'rgba(150,150,150,0.4)'}}>
                        <Text>set photo</Text>
                    </View>
                </Image>
            </TouchableHighlight>
        
        
        
        <FloatingLabelInput
          label="First Name"
          value={navigation.state.params.newFriend.firstName}
          onChangeText={(text) => {
                        const newFriend = Object.assign({}, navigation.state.params.newFriend, { firstName: text }); 
                        navigation.setParams({ newFriend });
                    }}
                    returnKeyType='done'/> 
        
        <Text>{`\n`}</Text>
        <FloatingLabelInput
          label="Last Name"
          value={navigation.state.params.newFriend.lastName}
          onChangeText={(text) => {
                        const newFriend = Object.assign({}, navigation.state.params.newFriend, { lastName: text }); 
                        navigation.setParams({ newFriend });
                    }}
                    returnKeyType='done'/> 
        
        <Text>{`\n`}</Text>
       <FloatingLabelInput
            style="marginTop: 100"
          label="Phone Number"
          value={navigation.state.params.newFriend.phone}
                    keyboardType='phone-pad'
                    onChangeText={(text) => {
                        const newFriend = Object.assign({}, navigation.state.params.newFriend, { phone: text }); 
                        navigation.setParams({ newFriend });
                    }}
                    returnKeyType='done'
        /> 
        <Text style={{marginTop: 40, color:'white', fontSize:18}}>How often do you want to reach out to this friend? </Text>
                <Picker
                selectedValue={navigation.state.params.newFriend.category}
                onValueChange={(itemValue, itemIndex) => {
                        const newFriend = Object.assign({}, navigation.state.params.newFriend, { category: itemValue }); 
                        navigation.setParams({ newFriend });
                    }}>               
                <Picker.Item color='white' label = 'Once a week' value = 'weekFriend' />
               <Picker.Item color='white' label = 'Once every two weeks' value = 'biweekFriend'  />
               <Picker.Item color='white' label = 'Once a month' value = 'monthFriend' />
               <Picker.Item color='white' label = 'Once every two months' value = 'bimonthFriend' />
            </Picker>
            {/*<TouchableHighlight underlayColor='rgba(200,200,200,0.8)'
                style={{position:'absolute', right:20, bottom:20, height:64, width:64, borderRadius:64/2}}
                onPress={() => {
                    if(this.state.newFriend.firstName != '' && this.state.newFriend.lastName != '' && this.state.newFriend.phone != undefined){
                      navigation.state.params.onSave(this.state.newFriend);
                      navigation.goBack()
                  } else {
                    Alert.alert('Oops!', error.message)
                    /*navigation.state.params.goBack()*
                  }

                }}>
                <View style={{alignItems: 'center', justifyContent:'center', flexDirection:'column', backgroundColor:'#EE4948',height:64, width:64, borderRadius:64/2, shadowColor: '#000000', shadowOffset: {width: 0, height: 4}, shadowRadius: 4, shadowOpacity: 0.7}}>
                    <Text style={{color:'white', fontSize:18}}>Add</Text>
                </View>
            </TouchableHighlight>*/}
      </View>
    );
  }
}

export default AddFriendInfoScreen;
