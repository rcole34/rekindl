import React from 'react';
import { View, Text, Button, Picker, TouchableHighlight, FlatList, Image } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown'

class MemoriesScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state={ memories: [
      {key: '1', photo: require('../../assets/memories/hiking.png')},
      {key: '2', photo: require('../../assets/memories/hiking.png')},
      {key: '3', photo: require('../../assets/memories/hiking.png')},
      {key: '4', photo: require('../../assets/memories/hiking.png')},
      {key: '5', photo: require('../../assets/memories/hiking.png')},
      {key: '6', photo: require('../../assets/memories/hiking.png')},
      {key: '7', photo: require('../../assets/memories/hiking.png')},
      {key: '9', photo: require('../../assets/memories/hiking.png')},
      {key: '10', photo: require('../../assets/memories/hiking.png')},
      {key: '11', photo: require('../../assets/memories/hiking.png')},
      {key: '12', photo: require('../../assets/memories/hiking.png')},
      {key: '13', photo: require('../../assets/memories/hiking.png')},
      {key: '14', photo: require('../../assets/memories/hiking.png')},
      {key: '15', photo: require('../../assets/memories/hiking.png')},
      {key: '16', photo: require('../../assets/memories/hiking.png')},
      {key: '17', photo: require('../../assets/memories/hiking.png')},
      {key: '18', photo: require('../../assets/memories/hiking.png')},
      {key: '19', photo: require('../../assets/memories/hiking.png')},
      {key: '20', photo: require('../../assets/memories/hiking.png')}
    ], user: "java"};
  }

 _renderItem(item, navigation) {
    console.log(item)
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
            defaultValue='All Friends'
            showsVerticalScrollIndicator={true}
            textStyle={{color: 'darkgray', fontSize: 28, marginTop: 23.5 }}>
          </ModalDropdown>
        </View>

        <View style={{ flex: 6, justifyContent: 'flex-start'}}>
          <FlatList
            visible={this.state.memories.length!==0}
            data={this.state.memories}
            numColumns='3'
            contentContainerStyle={this.container}
            renderItem={({item}) => this._renderItem(item, {navigate})}

            ItemSeparatorComponent={this.renderSeparator}
          />

    
          <TouchableHighlight underlayColor='rgba(200,200,200,0.8)'
            onPress={() => navigate('AddMemory')} style={{position:'absolute', right:20, bottom:20, height:64, width:64, borderRadius:64/2}}> 
              <View style={{alignItems: 'center', justifyContent:'center', flexDirection:'column', backgroundColor:'#EE4948',height:64, width:64, borderRadius:64/2, shadowColor: '#000000', shadowOffset: {width: 0, height: 4}, shadowRadius: 4, shadowOpacity: 0.7}}>
                <Text style={{color:'#FFF', fontSize:32, marginBottom:5}}>+</Text>
              </View>
          </TouchableHighlight>
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

  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 40
}
}

export default MemoriesScreen;