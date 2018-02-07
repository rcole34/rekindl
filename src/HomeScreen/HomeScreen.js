import React from 'react';
import { StatusBar, Alert, Dimensions, View, Text, Button, FlatList, StyleSheet, Image, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Swipeout from 'react-native-swipeout'
import { NavigationActions } from 'react-navigation'
import {AsyncStorage} from 'react-native'
import friendListObject from '../../data.js'
//var SearchBar = require('react-native-search-bar');

class HomeScreen extends React.Component {  
    

  constructor(props) {
    super(props);

    // UNCOMMENT THIS STUFF TO RESET THE DATABASE, THEN RECOMMENT AFTER RUNNING

    // this.state = {allData: [
    //     {key: 1, name: 'Claire R.', photo: require('../../assets/profilePictures/claire.png'), fire: require('../../assets/fires/small_fire.png'), lastConnected:"1 hour ago", lastConnectionType:"High-Fived", notificationCount:1},
    //     {key: 2, name:'John S.', photo: require('../../assets/profilePictures/john.png'), fire: require('../../assets/fires/large_fire.png'), lastConnected:"yesterday", lastConnectionType:"Sent Text", notificationCount:0},
    //     {key: 3, name:'Nate G.', photo: require('../../assets/profilePictures/nate.png'), fire: require('../../assets/fires/medium_fire.png'), lastConnected:"4 days ago", lastConnectionType:"Added Memory", notificationCount:0},
    //     {key: 4, name:'Ella E.', photo: require('../../assets/profilePictures/ella.png'), fire: require('../../assets/fires/dead_fire.png'), lastConnected:"2 weeks ago", lastConnectionType:"High-Fived", notificationCount:0}
    //   ], currData: [
    //     {key: 1, name:'Claire R.', photo: require('../../assets/profilePictures/claire.png'), fire: require('../../assets/fires/small_fire.png'), lastConnected:"1 hour ago", lastConnectionType:"High-Fived", notificationCount:1},
    //     {key: 2, name:'John S.', photo: require('../../assets/profilePictures/john.png'), fire: require('../../assets/fires/large_fire.png'), lastConnected:"yesterday", lastConnectionType:"Sent Text", notificationCount:0},
    //     {key: 3, name:'Nate G.', photo: require('../../assets/profilePictures/nate.png'), fire: require('../../assets/fires/medium_fire.png'), lastConnected:"4 days ago", lastConnectionType:"Added Memory", notificationCount:0},
    //     {key: 4, name:'Ella E.', photo: require('../../assets/profilePictures/ella.png'), fire: require('../../assets/fires/dead_fire.png'), lastConnected:"2 weeks ago", lastConnectionType:"High-Fived", notificationCount:0}
    //   ], width : Dimensions.get('window').width};
    // AsyncStorage.clear()
    // return 

    this.state = {isLoading: true}
    
    // this._removeFriend = this._removeFriend.bind(this)
    // this._removeFriendPressed = this._removeFriendPressed.bind(this)    
  }

  static navigationOptions = ({navigation}) => ({
        headerRight: 
            <TouchableWithoutFeedback onPress={() => navigation.navigate('AddFriend', {onSave: navigation.state.params.onSave})}>
                    <Image source={require('../../assets/icons/rounded-plus.png')} style={{tintColor: '#f1f1f1', height: 30, width: 30, marginRight: 15, marginBottom: 5}}/>
            </TouchableWithoutFeedback>,
    })

  async componentWillMount() {
    let isSetUp = await AsyncStorage.getItem('isSetUp')
    if (!isSetUp) {
      friendObject = {
        allData: friendListObject.allData,
        currData: friendListObject.allData,
      }

      await AsyncStorage.setItem('friends', JSON.stringify(friendObject))
      await AsyncStorage.setItem('isSetUp', 'done!')
    }
    AsyncStorage.getItem('friends').then((list) => {
      if (list == null) return
      let friendsList = JSON.parse(list)
      
      var deadFriends = {key: 1, fire: require('../../assets/fires/dead_fire.png'), currFire:"dead", message:"vanishing", friends:[]}
      var tinyFriends = {key: 2, fire: require('../../assets/fires/tiny_fire.png'), currFire:"tiny", message:"fading", friends:[]}
      var smallFriends = {key: 3, fire: require('../../assets/fires/small_fire.png'), currFire:"small", message:"calm", friends:[]}
      var mediumFriends = {key: 4, fire: require('../../assets/fires/medium_fire.png'), currFire:"medium", message:"toasty", friends:[]}
      var largeFriends = {key: 5, fire: require('../../assets/fires/large_fire.png'), currFire:"large", message:"roaring", friends:[]}

      for (var i = 0; i < friendsList.allData.length; i++) {
        if(friendsList.allData[i].currFire === 'dead') {
          deadFriends.friends.push(friendsList.allData[i])
        }
        else if(friendsList.allData[i].currFire === 'tiny') {
          tinyFriends.friends.push(friendsList.allData[i])
        }
        else if(friendsList.allData[i].currFire === 'small') {
          smallFriends.friends.push(friendsList.allData[i])
        }
        else if(friendsList.allData[i].currFire === 'medium') {
          mediumFriends.friends.push(friendsList.allData[i])
        }
        else if(friendsList.allData[i].currFire === 'large') {
          largeFriends.friends.push(friendsList.allData[i])
        }
      };
      this.setState({
        allData: friendsList.allData,
        currData: friendsList.currData,
        sortedFriends: [deadFriends, tinyFriends, smallFriends, mediumFriends, largeFriends],
        isLoading: false,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width
      })
    })
  }

    componentDidMount() {
        this.props.navigation.setParams({ onSave: this.onSave });
    }

/* render method for new prototype*/
  render() {
    if (this.state.isLoading) {
      return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>Loading...</Text></View>;
    }

    const { navigate } = this.props.navigation;
    return(
    <View style={{ backgroundColor:'#222', flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
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
    return(
        <View style={{backgroundColor:item.key%2==0?'#222':'#333', flex: 1, height: item.friends.length==0?50:190, marginTop: item.friends.length==0?40:0, width:this.state.width, flexDirection: 'column', justifyContent: 'center'}}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', top:-20}}>
                <Text style={{fontSize:24, color:'white', fontWeight:'200'}}>{item.message}</Text>
                <Image source={item.fire} style={{height:40, width:40, marginLeft:5}}/>
                {item.friends.length==0?null:<TouchableOpacity style={{position:'absolute', right: '3%'}} activeOpacity={0.25} onPress={() => { navigation.navigate('Detail', {currFriend: item.friends[0], sortedFriends: this.state.sortedFriends})}}>
                    <Text style={{color:"white"}}>View All</Text>
                </TouchableOpacity>}
            </View>
            {item.friends.length==0?<View style={{flex: 1, flexDirection:'row', marginTop: 10, marginBottom: 10, alignItems:'center', justifyContent:'center'}}><Text style={{fontStyle:'italic', color:'white'}}>No friends to display in this category</Text></View> : null}
            <FlatList
                style={{top:-35}}
                data={item.friends}
                extraData={this.state}
                renderItem={({item}) => this._renderList(item, navigation)}
                horizontal={true}/>
        </View>
    );
}

_renderList(item, navigation) {
    return(
        <View style={{flex: 1, flexDirection: 'column', justifyContent:'center', alignItems:'center', marginLeft:10, marginRight:10}}>
            <TouchableOpacity activeOpacity={0.25} onPress={() => { navigation.navigate('Detail', {currFriend: item, sortedFriends: this.state.sortedFriends});}}>
                <View style={{flex: 1, flexDirection: 'column', justifyContent:'center', alignItems:'center', marginLeft:10, marginRight:10}}>
                    <Image source={item.photo} style={{height:80, width:80, borderRadius:80/2}}/>
                    <Text style={{color:'white'}}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}


  /* Method used in old prototype to remove friend*/
  // _removeFriend(item) {

  //   //console.log(item)
  //   for (var i = 0; i < this.state.allData.length; i++) {
  //     if(this.state.allData[i].key === item.key) {
  //       this.state.allData.splice(i,1);
  //     }
  //   };
  //   let newFriendsList = {
  //     allData: this.state.allData,
  //     currData: this.state.allData
  //   }

  //   AsyncStorage.setItem('friends', JSON.stringify(newFriendsList))
  //   this.setState({currData : this.state.allData});
    
  // }


/* Method used in the old prototype to confirm removal of a friend*/
  // _removeFriendPressed(item) {
  //   Alert.alert('Delete ' + item.name + '?', 
  //     'This will delete all your memories with this friend.', 
  //     [
  //       {text: 'Delete', onPress: () => this._removeFriend(item)},
  //       {text: 'Cancel'}
  //     ])
  // }

/*Method used in old prototype to save a new friend*/
  onSave = user => {
    console.log('here')
    user.key = this.state.currData.length + new Date().getUTCMilliseconds();
    user.fire = require('../../assets/fires/tiny_fire.png');
    user.currFire = 'tiny'
    user.lastConnected = 'today';
    user.bgFire = require('../../assets/fires/fading.png')
    user.status = null
    user.statusAge = null
    user.number = user.phone.toString()
    delete user.phone
    const copyGroups = this.state.sortedFriends.slice();
    const copyData = this.state.allData.slice();
    copyData.push(user)
    copyGroups[1].friends.push(user);

    let newFriendsList = {
      allData: copyData,
      currData: copyData
    }

    AsyncStorage.setItem('friends', JSON.stringify(newFriendsList))
    this.setState({sortedFriends: copyGroups});
    this.forceUpdate();
    
  };


/* method used in old prototype to update order of friend list and update fire size when there was a connection*/
  // updateOrder = (item, action, newNotification) => {
  //   dataCopy = [];

  //   for (var i = 0; i < this.state.currData.length; i++) {
  //     if(this.state.currData[i].key === item.key) {
  //       dataCopy.push(this.state.currData[i])
  //     }
  //   };

  //   for (var i = 0; i < this.state.currData.length; i++) {
  //     if(this.state.currData[i].key !== item.key) {
  //       dataCopy.push(this.state.currData[i])
  //     }
  //   };

  //   dataCopy[0].lastConnected = 'today'
  //   dataCopy[0].lastConnectionType = 'You: ' + action


  //   notificationsCopy = dataCopy[0].notifications.slice()
  //   notificationsCopy.push(newNotification)
  //   dataCopy[0].notifications = notificationsCopy

  //   // UPDATE THE FIRE
  //   if (dataCopy[0].currFire == 'dead') {
  //     dataCopy[0].fire = require('../../assets/fires/tiny_fire.png')
  //     dataCopy[0].currFire = 'tiny'
  //   } else if (dataCopy[0].currFire == 'tiny') {
  //     dataCopy[0].fire = require('../../assets/fires/small_fire.png')
  //     dataCopy[0].currFire = 'small'
  //   } else if (dataCopy[0].currFire == 'small') {
  //     dataCopy[0].fire = require('../../assets/fires/medium_fire.png')
  //     dataCopy[0].currFire = 'medium'
  //   } else if (dataCopy[0].currFire == 'medium') {
  //     dataCopy[0].fire = require('../../assets/fires/large_fire.png')
  //     dataCopy[0].currFire = 'large'
  //   }

  //   this.setState({allData: dataCopy, currData: dataCopy})

    
  //   let newFriendsList = {
  //     allData: dataCopy,
  //     currData: dataCopy
  //   }
  //   AsyncStorage.setItem('friends', JSON.stringify(newFriendsList))
  // }


/* Method used in old prototype to update notification count when a user clicked on a friend who had notifications*/
  // updateNotifications = (userKey, notificationKey) => {
  //   dataCopy = [];

  //   for (var i = 0; i < this.state.currData.length; i++) {
  //     if (this.state.currData[i].key === userKey) {
  //       notificationsCopy = this.state.currData[i].notifications.slice()
  //       for (var j = 0; j < notificationsCopy.length; j++) {
  //         if (notificationsCopy[j].key === notificationKey) {
  //           notificationsCopy[j].status = 'old'
  //         }
  //       }

  //       this.state.currData[i].notifications = notificationsCopy
  //     }

  //     dataCopy.push(this.state.currData[i])
  //   };

  //   this.setState({allData: dataCopy, currData: dataCopy})

    
  //   let newFriendsList = {
  //     allData: dataCopy,
  //     currData: dataCopy
  //   }
  //   AsyncStorage.setItem('friends', JSON.stringify(newFriendsList))
  // }

/* Method never actually used but designed to filter shown friends if a search bar were implemented*/
  // function filterData(text) {
  //   var newData = [];
  //   for (var i = 0; i < allData.length; i++) {
  //     if(allData[i].key.toLowerCase.includes(text.toLowerCase()))
  //       newData.push(allData[i]);
  //   };
  //   currData = newData;
  // }


  /*idk how this was different than the method a few lines up lol*/
  // _removeNotifications(key) {
  //   dataCopy = this.state.currData;
  //   for (var i = 0; i < this.state.currData.length; i++) {
  //     if(this.state.currData[i].key === key) {
  //       dataCopy[i].notificationCount = 0;
  //       this.setState({ currData : dataCopy });
  //       this.setState({ allData : dataCopy });
  //     }
  //   };

  //   let newFriendsList = {
  //     allData: dataCopy,
  //     currData: dataCopy
  //   }
  //   AsyncStorage.setItem('friends', JSON.stringify(newFriendsList))
  // }

/* Controlled rendering of items in list view in old prototype*/
  // _renderItem(item, navigation) {
  //   let swipeBtns = [{
  //     text: 'High Five',
  //     backgroundColor: '#CDBB79',
  //     underlayColor: 'rgba(0, 0, 0, 0.6)',
  //     onPress: () => {
  //       // UPDATE DATABASE and ORDER

  //       newNotification = {
  //         key: item.notifications.length + 1, 
  //         status: 'old', 
  //         type: 'High-fived', 
  //         date: "Dec 8", 
  //         description: 'You high-fived ' + item.name, 
  //         icon: require('../../assets/icons/hand.png'), 
  //         tintColor: '#CDBB79'
  //       }

  //       this.updateOrder(item, 'High-fived', newNotification)
        
  //       Alert.alert('Success','High five sent!');
  //     }
  //   },
  //   {
  //     text: 'Remove',
  //     backgroundColor: 'crimson',
  //     underlayColor: 'rgba(0, 0, 0, 0.6)',
  //     onPress: () => {this._removeFriendPressed(item)}
  //   }];
  //   return(
  //         <Swipeout right={swipeBtns} backgroundColor= 'transparent' autoClose={true}>
  //           <TouchableHighlight underlayColor='rgba(200,200,200,0.8)'
  //           onPress={() => {
  //             this._removeNotifications(item.key);
  //             // navigation.navigate('Detail', {name: item.name, photo: item.photo, fire: item.fire, lastConnected: item.lastConnected});
  //             navigation.navigate('Detail', {notifications: this.updateNotifications, update: this.updateOrder, key: item.key, name: item.name});
  //           }}> 
  //             <View style={{flex: 1, height: 100, width:this.state.width, flexDirection: 'row', justifyContent: 'center'}}>
  //               <Image source={item.photo} style={{height:83, width:83, borderRadius:83/2, marginRight:10, marginTop:10, position:'absolute', left:10}}/>
  //               <View style={{display:item.notificationCount==0?'none':'flex', alignItems: 'center', justifyContent:'center', flexDirection:'column', backgroundColor:'#EE4948',height:26, width:26, borderRadius:26/2, position:'absolute', top:7, left:7}}>
  //                 <Text style={{color:'#FFF', fontSize:14,}}>{item.notificationCount}</Text>
  //               </View>
  //               <View style={{flexDirection: 'column', justifyContent: 'center', position:'absolute', left: 103, top:15}}>
  //                 <Text numberOfLines={1} style={{width: this.state.width/1.8, fontSize: 36, color:'#444', fontWeight:item.notificationCount==0?'normal':'bold'}}>{item.name}</Text>
  //                 <Text style={{fontSize: 14, color:'#888'}}>{item.lastConnectionType} {item.lastConnected}</Text>
  //               </View>
  //               <Image source={item.fire} style={{position:'absolute', right:0, width: 95, height: 95}}/>
  //             </View>
  //           </TouchableHighlight>
  //         </Swipeout>);
  // }

/*render method for old prototype*/
  // render() {
  //   if (this.state.isLoading) {
  //     return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>Loading...</Text></View>;
  //   }

  //   const { navigate } = this.props.navigation;
  //   return(
  //   <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
      
  //     <FlatList
  //       visible={this.state.currData.length!==0}
  //       data={this.state.currData}
  //       extraData={this.state}
  //       renderItem={({item}) => this._renderItem(item, {navigate})}

  //       ItemSeparatorComponent={this.renderSeparator}
  //     />
  //     <TouchableHighlight underlayColor='rgba(200,200,200,0.8)'
  //           onPress={() => navigate('AddFriend', {onSave: this.onSave})} style={{position:'absolute', right:20, bottom:20, height:64, width:64, borderRadius:64/2}}> 
  //       <View style={{alignItems: 'center', justifyContent:'center', flexDirection:'column', backgroundColor:'#EE4948',height:64, width:64, borderRadius:64/2, shadowColor: '#000000', shadowOffset: {width: 0, height: 4}, shadowRadius: 4, shadowOpacity: 0.7}}>
  //         <Text style={{color:'#FFF', fontSize:32, marginBottom:5}}>+</Text>
  //       </View>
  //     </TouchableHighlight>
  //   </View>

  // )};

  renderSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: '90%',
            backgroundColor: '#999',
            marginLeft: '5%',
            marginRight: '5%'
          }}
        />
      );
    };
  }

export default HomeScreen;