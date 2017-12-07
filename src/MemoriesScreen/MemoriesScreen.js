import React from 'react';
import { View, Text, Button, Picker, TouchableHighlight, FlatList, Image } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown'

class MemoriesScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state={ memories: [
      {key: '1', photo: require('../../assets/memories/hiking.png')},
      {key: '2', photo: require('../../assets/memories/friends2.png')},
      {key: '3', photo: require('../../assets/memories/friends13.png')},
      {key: '4', photo: require('../../assets/memories/friends4.png')},
      {key: '5', photo: require('../../assets/memories/friends5.png')},
      {key: '6', photo: require('../../assets/memories/friends6.png')},
      {key: '7', photo: require('../../assets/memories/friends7.png')},
      {key: '9', photo: require('../../assets/memories/friends8.png')},
      {key: '10', photo: require('../../assets/memories/friends9.png')},
      {key: '11', photo: require('../../assets/memories/friends10.png')},
      {key: '12', photo: require('../../assets/memories/friends11.png')},
      {key: '13', photo: require('../../assets/memories/friends12.png')},
      {key: '14', photo: require('../../assets/memories/friends3.png')},
      {key: '15', photo: require('../../assets/memories/friends14.png')},
      {key: '16', photo: require('../../assets/memories/friends15.png')},
    ], user: "java"};
  }

 _renderItem(item, navigation) {
    return(
      <TouchableHighlight underlayColor='rgba(200,200,200,0.8)'
        onPress={() => navigation.navigate('MemoryDetail')}>
        <View style={{flex: 1, height: 105, width: 105, marginLeft: 10, flexDirection: 'row', justifyContent: 'center'}}>
            <Image source={item.photo} style={{height:105, width:105, marginLeft:0, position:'absolute', left: 10}}/>
        </View>
      </TouchableHighlight>
  );
  }

  render() {
    const { navigate } = this.props.navigation;
    return(

      <View style={{ flex: 1 }}>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center'}}>      
          <Text style={{fontSize: 25, marginTop: 25 }}> Memories With: </Text>

          <ModalDropdown
            options={['All Friends', 'Claire R.', 'John S.', 'Nate G.', 'Ella E.']}
            defaultValue= 'All Friends'
            defaultIndex={0}
            showsVerticalScrollIndicator={true}
            textStyle={{textAlign: 'center', width: 150, backgroundColor: 'white', borderColor: 'gray', borderWidth:1, fontSize: 28, marginTop: 23.5}}
            dropdownStyle={{width: 150}}
            dropdownTextStyle={{textAlign: 'center', width:150, fontSize: 18}}>
          </ModalDropdown>
        </View>

        <View style={{ flex: 6, justifyContent: 'flex-start'}}>
          <FlatList
            visible={this.state.memories.length!==0}
            data={this.state.memories}
            numColumns='3'
            renderItem={({item}) => this._renderItem(item, {navigate})}

            ItemSeparatorComponent={this.renderSeparator}
          />

        </View>

      </View>
  )};

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