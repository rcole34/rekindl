import React from 'react';
import { Alert, Dimensions, View, Text, Button, FlatList, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Swipeout from 'react-native-swipeout'
//var SearchBar = require('react-native-search-bar');

class HomeScreen extends React.Component {
  // width = Dimensions.get('window').width;
  // allData=[
  //       {key: 'Claire R.', photo: require('../../assets/profilePictures/claire.png'), fire: require('../../assets/fires/small_fire.png'), lastConnected:"1 week ago"},
  //       {key: 'John S.', photo: require('../../assets/profilePictures/john.png'), fire: require('../../assets/fires/large_fire.png'), lastConnected:"yesterday"},
  //       {key: 'Nate G.', photo: require('../../assets/profilePictures/nate.png'), fire: require('../../assets/fires/medium_fire.png'), lastConnected:"4 days ago"},
  //       {key: 'Ella E.', photo: require('../../assets/profilePictures/ella.png'), fire: require('../../assets/fires/dead_fire.png'), lastConnected:"2 weeks ago"},
  //     ]
  
  constructor(props) {
    super(props);
    this.state = {allData: [
        {key: 1, name: 'Claire R.', photo: require('../../assets/profilePictures/claire.png'), fire: require('../../assets/fires/small_fire.png'), lastConnected:"1 week ago"},
        {key: 2, name:'John S.', photo: require('../../assets/profilePictures/john.png'), fire: require('../../assets/fires/large_fire.png'), lastConnected:"yesterday"},
        {key: 3, name:'Nate G.', photo: require('../../assets/profilePictures/nate.png'), fire: require('../../assets/fires/medium_fire.png'), lastConnected:"4 days ago"},
        {key: 4, name:'Ella E.', photo: require('../../assets/profilePictures/ella.png'), fire: require('../../assets/fires/dead_fire.png'), lastConnected:"2 weeks ago"}
      ], currData: [
        {key: 1, name:'Claire R.', photo: require('../../assets/profilePictures/claire.png'), fire: require('../../assets/fires/small_fire.png'), lastConnected:"1 week ago"},
        {key: 2, name:'John S.', photo: require('../../assets/profilePictures/john.png'), fire: require('../../assets/fires/large_fire.png'), lastConnected:"yesterday"},
        {key: 3, name:'Nate G.', photo: require('../../assets/profilePictures/nate.png'), fire: require('../../assets/fires/medium_fire.png'), lastConnected:"4 days ago"},
        {key: 4, name:'Ella E.', photo: require('../../assets/profilePictures/ella.png'), fire: require('../../assets/fires/dead_fire.png'), lastConnected:"2 weeks ago"}
      ], width : Dimensions.get('window').width};
    this._removeFriend = this._removeFriend.bind(this)
    this._removeFriendPressed = this._removeFriendPressed.bind(this)
  }
  
_removeFriend = (item) => {

    //console.log(item)
    for (var i = 0; i < this.state.allData.length; i++) {
      if(this.state.allData[i].key === item.key) {
        this.state.allData.splice(i,1);
      }
    };
    this.setState({currData : this.state.allData});
    console.log(this.state.currData);
  }

  _removeFriendPressed(item) {
    Alert.alert('Delete ' + item.name + '?', 
      'This will delete all your memories with this friend.', 
      [
        {text: 'Delete', onPress: () => this._removeFriend(item)},
        {text: 'Cancel'}
      ])
  }

  


  /*function filterData(text) {
    var newData = [];
    for (var i = 0; i < allData.length; i++) {
      if(allData[i].key.toLowerCase.includes(text.toLowerCase()))
        newData.push(allData[i]);
    };
    currData = newData;
  }*/

  _renderItem(item, navigation) {
    let swipeBtns = [/*{
      text: 'High Five',
      backgroundColor: 'green',
      underlayColor: 'rgba(0, 0, 0, 0.6)'
    },*/
    {
      text: 'Remove',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 0.6)',
      onPress: () => {this._removeFriendPressed(item)}
    }];
    return(
          <Swipeout right={swipeBtns} backgroundColor= 'transparent' autoClose={true}>
            <TouchableHighlight underlayColor='rgba(200,200,200,0.8)'
            onPress={() => navigation.navigate('Detail', {name: item.name, photo: item.photo, fire: item.fire, lastConnected: item.lastConnected})}> 
            <View style={{flex: 1, height: 100, width:this.state.width, flexDirection: 'row', justifyContent: 'center'}}>
              <Image source={item.photo} style={{height:83, width:83, marginRight:10, marginTop:10, position:'absolute', left:10}}/>
              <View style={{flexDirection: 'column', justifyContent: 'center', position:'absolute', left: 103, top:15}}>
                <Text style={{fontSize: 42, color:'#444'}}>{item.name}</Text>
                <Text style={{fontSize: 14, color:'#888'}}>last connected {item.lastConnected}</Text>
              </View>
              <Image source={item.fire} style={{position:'absolute', right:0, width: 95, height: 95}}/>
            </View>
          </TouchableHighlight>
        </Swipeout>);
  }

  render() {
    const { navigate } = this.props.navigation;
    return(
    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
      
      <FlatList
        visible={this.state.currData.length!==0}
        data={this.state.currData}
        renderItem={({item}) => this._renderItem(item, {navigate})}

        ItemSeparatorComponent={this.renderSeparator}
      />
      <TouchableHighlight underlayColor='rgba(200,200,200,0.8)'
            onPress={() => navigate('AddFriend')} style={{position:'absolute', right:20, bottom:20, height:64, width:64, borderRadius:64/2}}> 
        <View style={{alignItems: 'center', justifyContent:'center', flexDirection:'column', backgroundColor:'#EE4948',height:64, width:64, borderRadius:64/2, shadowColor: '#000000', shadowOffset: {width: 0, height: 4}, shadowRadius: 4, shadowOpacity: 0.7}}>
          <Text style={{color:'#FFF', fontSize:32, marginBottom:5}}>+</Text>
        </View>
      </TouchableHighlight>
    </View>

  )};

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