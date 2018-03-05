import React from 'react';
import { StatusBar, Alert, Dimensions, View, Text, Button, FlatList, StyleSheet, Image, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Swipeout from 'react-native-swipeout'
import { NavigationActions } from 'react-navigation'
import {AsyncStorage} from 'react-native'
import {AppLoading} from 'expo'
import firebase from '../../firebase.js'
import {Segment, Notifications } from 'expo'
import {handleNotifications} from '../../notificationHandler.js';




class HomeScreen extends React.Component {  
    

    constructor(props) {
        super(props);
        this.state = {isLoading: true, handlerSet: false}
        Segment.identify(Expo.Constants.deviceId)
        Segment.screen("Home Screen")
        //console.log('constructor')
    }

    static navigationOptions = ({navigation}) => ({
        headerRight: 
            <TouchableWithoutFeedback onPress={() => {
                Segment.track("Home - Clicked Add A Friend");
                navigation.navigate('AddFriend', {onSave: navigation.state.params.onSave, uid: navigation.state.params.uid, value: navigation.state.params.value, newFriend:navigation.state.params.newFriend})}}>
                    <Image source={require('../../assets/icons/rounded-plus.png')} style={{tintColor: '#f1f1f1', height: 30, width: 30, marginRight: 15, marginBottom: 5}}/>
            </TouchableWithoutFeedback>,
    })

    async componentWillMount() {
        var deadFriends = {key: 1, fire: require('../../assets/fires/dead_fire.png'), currFire:"dead", message:"vanishing", friends:[]}
        var tinyFriends = {key: 2, fire: require('../../assets/fires/tiny_fire.png'), currFire:"tiny", message:"fading", friends:[]}
        var smallFriends = {key: 3, fire: require('../../assets/fires/small_fire.png'), currFire:"small", message:"calm", friends:[]}
        var mediumFriends = {key: 4, fire: require('../../assets/fires/medium_fire.png'), currFire:"medium", message:"toasty", friends:[]}
        var largeFriends = {key: 5, fire: require('../../assets/fires/large_fire.png'), currFire:"large", message:"roaring", friends:[]}
    
        var user = firebase.auth().currentUser;
        //console.log('logged in as ' + user.displayName)
        firebase.database().ref('users').child(user.uid).child('notifications').on('value', (snapshot) => {
                if (snapshot.val() && !this.state.handlerSet) {
                    this._notificationSubscription = Notifications.addListener(handleNotifications);
                    //console.log("Home Set handler");
                    this.state.handlerSet = true;
                    this.setState({
                        handlerSet: this.state.handlerSet
                    });
                } else if (!snapshot.val() && this.state.handlerSet) {
                    this._notificationSubscription.remove(handleNotifications);
                    this.state.handlerSet = false;
                    this.setState({
                      handlerSet: this.state.handlerSet
                    });
                }
            });
        firebase.database().ref('users').child(user.uid).child('friends').on('value', async function(snapshot) {
            list = snapshot.val()
            //let friendPhotos = JSON.parse(await AsyncStorage.getItem('friendPhotos')) || {}
            if (list == null) {
                this.setState({
                    //friendPhotos: friendPhotos,
                    sortedFriends: [deadFriends, tinyFriends, smallFriends, mediumFriends, largeFriends],
                    isLoading: false,
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').width
                })
                return
            }

            //get statuses of users, organized by phone number
            userPhones = {}
            await firebase.database().ref('users').once('value', async function(snapshot) {
                users = snapshot.val()
                for(uid in users) {
                    user = users[uid]
                    userPhones[user.phone] = {status: user.status, statusPosted: user.statusPosted}
                }
            })
            //console.log(userPhones)


            deadFriends.friends = []
            tinyFriends.friends = []
            smallFriends.friends = []
            mediumFriends.friends = []
            largeFriends.friends = []
            let defaultPhoto = require('../../assets/profilePictures/default-profile.png')
            let fires = [require('../../assets/fires/dead_fire.png'), require('../../assets/fires/tiny_fire.png'), require('../../assets/fires/small_fire.png'), require('../../assets/fires/medium_fire.png'), require('../../assets/fires/large_fire.png')]
            let bgFires = [require('../../assets/fires/vanishing.png'), require('../../assets/fires/fading.png'), require('../../assets/fires/calm.jpg'), require('../../assets/fires/toasty.png'), require('../../assets/fires/roaring.png')]

        

            for (var key in list) {
                friend = list[key]
                //set fire to appropriate size
                if(friend.lastConnected != 'never') {
                    var fireTime = 7
                    switch(friend.category) {
                        case 'biweekFriend':
                            fireTime = 14
                            break;
                        case 'monthFriend':
                            fireTime = 30
                            break;
                        case 'bimonthFriend':
                            fireTime = 60
                            break;
                    }
                    fireTime *= 86400000 //total lifespan of fire in ms
                    var timeApart = Date.now() - friend.lastConnected //time in ms since last connection
                    switch(Math.floor(fireTime*1.0/timeApart)) {
                        case 0:
                            friend.currFire = 'dead'
                            break;
                        case 1:
                            friend.currFire = 'tiny'
                            break;
                        case 2:
                            friend.currFire = 'small'
                            break;
                        case 3:
                            friend.currFire = 'medium'
                            break;
                        default:
                            friend.currFire = 'large'
                    }
                }

                //set friend photos
                // if(friendPhotos && friendPhotos[key]) {
                //     friend.photo = friendPhotos[key]
                // }
                /*else*/ if(!friend.photo || !friend.photo.uri) {
                    friend.photo = defaultPhoto
                }

                //connect friends to their status
                if(userPhones[friend.number]) {
                    friend.status = userPhones[friend.number].status
                    friend.statusPosted = userPhones[friend.number].statusPosted
                }

                //sort into categories
                if(friend.currFire === 'dead') {
                    friend.bgFire = bgFires[0]
                    friend.fire = fires[0]
                    deadFriends.friends.push(friend)
                }
                else if(friend.currFire === 'tiny') {
                    friend.bgFire = bgFires[1]
                    friend.fire = fires[1]
                    tinyFriends.friends.push(friend)
                }
                else if(friend.currFire === 'small') {
                    friend.bgFire = bgFires[2]
                    friend.fire = fires[2]
                    smallFriends.friends.push(friend)
                }
                else if(friend.currFire === 'medium') {
                    friend.bgFire = bgFires[3]
                    friend.fire = fires[3]
                    mediumFriends.friends.push(friend)
                }
                else if(friend.currFire === 'large') {
                    friend.bgFire = bgFires[4]
                    friend.fire = fires[4]
                    largeFriends.friends.push(friend)
                }
            };

            var sortedFriends = [deadFriends, tinyFriends, smallFriends, mediumFriends, largeFriends]
            for(index in sortedFriends) {
                if(!sortedFriends[index].friends) continue;
                sortedFriends[index].friends.sort(function(a, b){
                var timeA=a.lastConnected, timeB=b.lastConnected;
                if(timeA === timeB)
                    return 0;
                if(timeA === 'never')
                    return -1;
                if(timeB === 'never')
                    return 1;
                if (timeA < timeB) //sort string ascending
                    return -1;
                if (timeA > timeB)
                    return 1;
                return 0; //default return value (no sorting)
            });
            }
            this.setState({
                //friendPhotos: friendPhotos,
                sortedFriends: sortedFriends,
                isLoading: false,
                handlerSet: this.state.handlerSet,
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').width
            })
            
        }.bind(this))

    }

    


    componentDidMount() {
        //console.log('did mount')
        this.props.navigation.setParams({ onSave: this.onSave });
        this.props.navigation.setParams({ value: '', newFriend: {firstName:'', lastName:'', category: 'weekFriend', photo:require('../../assets/profilePictures/default-profile.png'), phone:''}} );
    }

    componentWillUnmount() {
        //console.log("Unmounting home");
        //console.log(this.state.handlerSet);
        if (this.state.handlerSet) {
            //console.log("Removing handler");
            this._notificationSubscription.remove(handleNotifications);
            this.setState({
                handlerSet: false
            })
        }
    }




/* render method for new prototype*/
  render() {
    if (this.state.isLoading) {
        // return (
        //     <AppLoading/>
        // );
      return <View style={{flex: 1, backgroundColor:'#333', justifyContent: 'center', alignItems: 'center'}}><Text style={{color:'white'}}>Loading...</Text></View>;
    }

    const { navigate } = this.props.navigation;
    return(
    <View style={{ backgroundColor:'#222', flex: 1, alignItems: 'flex-start'}}>
        <StatusBar
            barStyle="light-content"/>
        <FlatList
            data={this.state.sortedFriends}
            extraData={this.state}
            renderItem={({item}) => this._renderCategory(item, {navigate})}/>

      
    </View>

  )};

/*method to render the categories of friends on the home screen*/
_renderCategory(item, navigation) {
    const numFriends = item.friends.length
    return(
        <View style={{backgroundColor:item.key%2==0?'#222':'#333', flex: 1, height: numFriends ? 200 : 50, marginTop: 0, width:this.state.width, opacity: numFriends ? 1 : 0.5, flexDirection: 'column', justifyContent: 'center'}}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', top: numFriends ? -20 : 15, }}>
                <Text style={{fontSize:24, color:'white', fontWeight:'200'}}>{item.message}</Text>
                <Image source={item.fire} style={{height:40, width:40, marginLeft:5}}/>
                {numFriends ? 
                <TouchableOpacity style={{position:'absolute', right: '3%'}} activeOpacity={0.25} onPress={() => { 
                    Segment.track("Home - Clicked View All")
                    navigation.navigate('Detail', {currFriend: item.friends[0], sortedFriends: this.state.sortedFriends, rekindl: this.rekindl})}}>
                    <Text style={{color:"white"}}>View All</Text>
                </TouchableOpacity> 
                : null }
            </View>

            <FlatList
                style={{top:-35}}
                data={item.friends}
                extraData={this.state}
                renderItem={({item}) => this._renderList(item, navigation)}
                horizontal={true}
                showsHorizontalScrollIndicator={false}/>
        </View>
    );
}

_renderList(item, navigation) {
    return(
        <View style={{flex: 1, flexDirection: 'column', justifyContent:'center', alignItems:'center', marginLeft:10, marginRight:10}}>
            <TouchableOpacity activeOpacity={0.25} onPress={() => { 
                Segment.track("Home - Clicked On A Friend")
                navigation.navigate('Detail', {currFriend: item, sortedFriends: this.state.sortedFriends, rekindl: this.rekindl});}}>
                <View style={{flex: 1, flexDirection: 'column', justifyContent:'center', alignItems:'center', marginLeft:10, marginRight:10}}>
                    <Image source={item.photo} style={{height:80, width:80, borderRadius:80/2}}/>
                    <Text style={{color:'white'}}>{item.firstName} {item.lastName[0]}.</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

rekindl = (user) => {
    var currUser = firebase.auth().currentUser;
    firebase.database().ref('users').child(currUser.uid).child('friends').child(user.number).set({key: user.key, firstName: user.firstName, lastName: user.lastName, currFire: 'large', number: user.number, lastConnected: Date.now(), category: user.category, photo:user.photo})    
  };



  onSave = (user) => {
    var currUser = firebase.auth().currentUser;

    user.key = this.state.sortedFriends[1].friends.length + Date.now();
    
    user.currFire = 'dead'
    var daysAgoToMakeTiny = 0
    user.lastConnected = 'never';
    user.status = null
    user.statusAge = null
    user.number = user.phone.toString()
    delete user.phone
    // let friendPhotos = this.state.friendPhotos
    // if(friendPhotos){
    //     friendPhotos[user.number] = user.photo
    // }

    // AsyncStorage.setItem('friendPhotos', JSON.stringify(friendPhotos))

    firebase.database().ref('users').child(currUser.uid).child('friends').child(user.number).set({key: user.key, firstName: user.firstName, lastName: user.lastName, currFire: user.currFire, number: user.number, lastConnected: user.lastConnected, category: user.category, photo: user.photo})
    
  };



}

export default HomeScreen;