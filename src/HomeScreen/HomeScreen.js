import React from 'react';
import { Dimensions, View, Text, Button, FlatList, StyleSheet, Image, TouchableHighlight } from 'react-native';
//var SearchBar = require('react-native-search-bar');
var width = Dimensions.get('window').width;

/*var allData=[
        {key: 'Claire R.', photo: require('../../assets/profilePictures/claire.png'), fire: require('../../assets/fires/smallFire.png'), lastConnected:"1 week ago"},
        {key: 'John S.', photo: require('../../assets/profilePictures/john.png'), fire: require('../../assets/fires/largeFire.png'), lastConnected:"yesterday"},
        {key: 'Nate G.', photo: require('../../assets/profilePictures/nate.png'), fire: require('../../assets/fires/mediumFire.png'), lastConnected:"4 days ago"},
        {key: 'Ella E.', photo: require('../../assets/profilePictures/ella.png'), fire: require('../../assets/fires/deadFire.png'), lastConnected:"2 weeks ago"},
      ]

var currData = allData;
function filterData(text) {
  var newData = [];
  for (var i = 0; i < allData.length; i++) {
    if(allData[i].key.toLowerCase.includes(text.toLowerCase()))
      newData.push(allData[i]);
  };
  currData = newData;
}

this.state = {text: ''}*/

const HomeScreen = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
    
    <FlatList
      data={[
        {key: 'Claire R.', photo: require('../../assets/profilePictures/claire.png'), fire: require('../../assets/fires/smallFire.png'), lastConnected:"1 week ago"},
        {key: 'John S.', photo: require('../../assets/profilePictures/john.png'), fire: require('../../assets/fires/largeFire.png'), lastConnected:"yesterday"},
        {key: 'Nate G.', photo: require('../../assets/profilePictures/nate.png'), fire: require('../../assets/fires/mediumFire.png'), lastConnected:"4 days ago"},
        {key: 'Ella E.', photo: require('../../assets/profilePictures/ella.png'), fire: require('../../assets/fires/deadFire.png'), lastConnected:"2 weeks ago"},
      ]}
      
      renderItem={({item}) => <TouchableHighlight underlayColor='rgba(200,200,200,0.8)'
        onPress={() => navigation.navigate('Detail', {name: item.key})}> 
        <View style={{flex: 1, height: 100, width:width, flexDirection: 'row', justifyContent: 'center'}}>
          <Image source={item.photo} style={{height:83, width:83, marginRight:10, marginTop:10, position:'absolute', left:10}}/>
          <View style={{flexDirection: 'column', justifyContent: 'center', position:'absolute', left: 103, top:15}}>
            <Text style={{fontSize: 42, color:'#444'}}>{item.key}</Text>
            <Text style={{fontSize: 14, color:'#888'}}>last connected {item.lastConnected}</Text>
          </View>
          <Image source={item.fire} style={{position:'absolute', right:0}}/>
        </View>
      </TouchableHighlight>}

      ItemSeparatorComponent={this.renderSeparator}
    />
  </View>
);

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

export default HomeScreen;