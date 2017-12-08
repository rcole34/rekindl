import React from 'react';
import { View, Text, Button, Picker, TouchableHighlight, FlatList, Image } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown'

class MemoriesScreen extends React.Component {

  constructor(props) {
    super(props);
    const navigation = this.props.navigation;
    this.newphoto = navigation.state.params;

    this.state={ memories: [
      {key: '1', photo: require('../../assets/memories/hiking.png'), friend: 'Claire R.'},
      {key: '2', photo: require('../../assets/memories/friends2.png'), friend: 'John S.'},
      {key: '3', photo: require('../../assets/memories/friends13.png'), friend: 'Nate G.'},
      {key: '4', photo: require('../../assets/memories/friends4.png'), friend: 'Claire R.'},
      {key: '5', photo: require('../../assets/memories/friends5.png'), friend: 'John S.'},
      {key: '6', photo: require('../../assets/memories/friends6.png'), friend: 'Ella E.'},
      {key: '7', photo: require('../../assets/memories/friends7.png'), friend: 'Ella E.'},
      {key: '9', photo: require('../../assets/memories/friends8.png'), friend: 'Nate G.'},
      {key: '10', photo: require('../../assets/memories/friends9.png'), friend: 'Claire R.'},
      {key: '11', photo: require('../../assets/memories/friends10.png'), friend: 'Ella E.'},
      {key: '12', photo: require('../../assets/memories/friends11.png'), friend: 'John S.'},
      {key: '13', photo: require('../../assets/memories/friends12.png'), friend: 'Nate G.'},
      {key: '14', photo: require('../../assets/memories/friends3.png'), friend: 'John S.'},
      {key: '15', photo: require('../../assets/memories/friends14.png'), friend: 'Ella E.'},
      {key: '16', photo: require('../../assets/memories/friends15.png'), friend: 'Claire R.'},
    ], count: 16, friend: 'All Friends', options: ['All Friends', 'Claire R.', 'John S.', 'Nate G.', 'Ella E.']};
  }

 _renderItem(item, navigation) {
    if(this.state.friend == 'All Friends' || item.friend == this.state.friend) {
      return(
        <TouchableHighlight underlayColor='rgba(200,200,200,0.8)'
          onPress={() => navigation.navigate('MemoryDetail', {friend: item.friend, photo: item.photo}) }>
          <View style={{flex: 1, height: 105, width: 105, marginLeft: 10, flexDirection: 'row', justifyContent: 'center'}}>
              <Image source={item.photo} style={{height:105, width:105, marginLeft:0, position:'absolute', left: 10}}/>
          </View>
        </TouchableHighlight>
      );
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    try {
        this.state.count = this.state.count + 1;
        list = this.state.memories;
        list.unshift({key: '\'' + this.state.count + '\'', photo: this.newphoto.image, friend: this.newphoto.friend});
        this.newphoto = null;
    } catch(err) {}

    return(

      <View key={this.state.friend} style={{ flex: 1 }}>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center'}}>      
          <Text style={{fontSize: 25, marginTop: 25, color:'#444' }}> Memories With: </Text>

          <ModalDropdown
            options={ this.state.options }
            defaultValue= { this.state.friend }
            defaultIndex={ this._defaultIndex() }
            onSelect={(idx, value) => {
              this.state.friend = value;
              this.setState(this.state);
            } }
            showsVerticalScrollIndicator={true}
            textStyle={{textAlign: 'center', width: 150, backgroundColor: 'white', borderColor: 'gray', borderWidth:1, fontSize: 28, marginTop: 23.5}}
            dropdownStyle={{width: 150}}
            dropdownTextStyle={{textAlign: 'center', width:150, fontSize: 18}}>
          </ModalDropdown>
        </View>

        <View style={{ flex: 6, justifyContent: 'flex-start'}}>
          <FlatList
            visible={this.state.memories.length!==0}
            data={this._filterFriends()}
            numColumns='3'
            renderItem={({item}) => this._renderItem(item, {navigate})}

            ItemSeparatorComponent={this.renderSeparator}
          />

        </View>

      </View>
    )};

  _filterFriends() {
    if (this.state.friend == 'All Friends') {
      return this.state.memories;
    }
    list = this.state.memories;
    newlist = [];

    for (var memory of list) {
      if(memory.friend == this.state.friend) {
        newlist.push(memory);
      }
    }
    return newlist;
  }

  _defaultIndex() {
    list = this.state.options;
    return list.indexOf(this.state.friend);
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          marginTop: '3%',
          marginLeft: '3%'
        }}
      />
    );
  };
}

export default MemoriesScreen;