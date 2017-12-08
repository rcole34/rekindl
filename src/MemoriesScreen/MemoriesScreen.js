import React from 'react';
import { View, Text, Button, Picker, TouchableHighlight, FlatList, Image } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown'
import { AsyncStorage } from 'react-native'

class MemoriesScreen extends React.Component {

  constructor(props) {
    super(props);
    // const navigation = this.props.navigation;

    this.state = {isLoading: true}
    // this.imtrying = this.imtrying.bind(this)

    // this.state={ memories: [
    //   {key: '1', photo: require('../../assets/memories/hiking.png'), friend: 'Claire R.'},
    //   {key: '2', photo: require('../../assets/memories/friends2.png'), friend: 'John S.'},
    //   {key: '3', photo: require('../../assets/memories/friends13.png'), friend: 'Nate G.'},
    //   {key: '4', photo: require('../../assets/memories/friends4.png'), friend: 'Claire R.'},
    //   {key: '5', photo: require('../../assets/memories/friends5.png'), friend: 'John S.'},
    //   {key: '6', photo: require('../../assets/memories/friends6.png'), friend: 'Ella E.'},
    //   {key: '7', photo: require('../../assets/memories/friends7.png'), friend: 'Ella E.'},
    //   {key: '9', photo: require('../../assets/memories/friends8.png'), friend: 'Nate G.'},
    //   {key: '10', photo: require('../../assets/memories/friends9.png'), friend: 'Claire R.'},
    //   {key: '11', photo: require('../../assets/memories/friends10.png'), friend: 'Ella E.'},
    //   {key: '12', photo: require('../../assets/memories/friends11.png'), friend: 'John S.'},
    //   {key: '13', photo: require('../../assets/memories/friends12.png'), friend: 'Nate G.'},
    //   {key: '14', photo: require('../../assets/memories/friends3.png'), friend: 'John S.'},
    //   {key: '15', photo: require('../../assets/memories/friends14.png'), friend: 'Ella E.'},
    //   {key: '16', photo: require('../../assets/memories/friends15.png'), friend: 'Claire R.'},
    // ], count: 16, friend: 'All Friends', options: ['All Friends', 'Claire R.', 'John S.', 'Nate G.', 'Ella E.']};
  }


  async componentWillMount() {
        console.log(this.props.navigation.state.params)


    AsyncStorage.getItem('friends').then((list) => {
      if (list == null) return
      let friends = JSON.parse(list).allData

      optionsList = ['All Friends']
      optionsKeys = [-5]
      for (var i = 0; i < friends.length; i++) {
        optionsList.push(friends[i].name)
        optionsKeys.push(friends[i].key)
      }


      AsyncStorage.getItem('photos').then((list) => {
        if (list == null) return
        let photos = JSON.parse(list).photos

        this.setState({
          isLoading: false,
          memories: photos,
          count: photos.length, 
          friend: this.props.navigation.state.params ? this.props.navigation.state.params.friendName : 'All Friends',
          friendKey: this.props.navigation.state.params ? this.props.navigation.state.params.friendKey : -5, 
          options: optionsList,
          optionsKeys: optionsKeys,
        })
      })
    })
  }

    imtrying = (friendName, friendKey) => {
      this.componentWillMount()
      this.setState({friend: friendName, friendKey: friendKey})
    }


 _renderItem(item, navigation) {
    return(
      <TouchableHighlight underlayColor='rgba(200,200,200,0.8)'
        onPress={() => {
          navigation.navigate('MemoryDetail', {friend: this.state.options[this.state.optionsKeys.indexOf(item.friendKey)], photo: item.file, photoKey: item.key})
      }}>
        <View style={{height: 105, width: 105, flexDirection: 'row', marginLeft: 10, marginRight: 10, marginBottom: 5}}>
            <Image source={item.file} style={{height:105, width:105}}/>
        </View>
      </TouchableHighlight>
    );
    
  }

  render() {
    if (this.state.isLoading) {
      return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>Loading...</Text></View>;
    }

    const { navigate } = this.props.navigation;

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
              for (var i = 0; i < this.state.options.length; i++) {
                if (this.state.options[i] === value) {
                  this.state.friendKey = optionsKeys[i]
                  break;
                }
              }
              this.setState(this.state);
            } }
            onDropdownWillShow={async () => {
              let list = await AsyncStorage.getItem('friends')
              let friends = JSON.parse(list).allData

              optionsList = ['All Friends']
              optionsKeys = [-5]
              for (var i = 0; i < friends.length; i++) {
                optionsList.push(friends[i].name)
                optionsKeys.push(friends[i].key)
              }
              this.setState({options: optionsList,optionsKeys: optionsKeys,})
            }}
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
            contentContainerStyle={{marginLeft: 20}}
            ItemSeparatorComponent={this.renderSeparator}
          />

        </View>

      </View>
    )};

  _filterFriends() {
    if (this.state.friendKey == -5) {
      return this.state.memories;
    }
    list = this.state.memories;
    newlist = [];

    for (var memory of list) {
      if(memory.friendKey === this.state.friendKey) {
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