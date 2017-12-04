import React from 'react';
import { View, Text, TouchableHighlight, FlatList, Image } from 'react-native';


class MemoriesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={ memories: [
      {key: '1', photo: require('../../assets/memories/hiking.png')}
    ]};
  }

 _renderItem(item, navigation) {
    console.log(item)
    return(
      <TouchableHighlight underlayColor='rgba(200,200,200,0.8)'>
        <View style={{flex: 1, height: 100, width:100, flexDirection: 'row', justifyContent: 'center'}}>
            <Image source={item.photo} style={{height:83, width:83, marginRight:10, marginTop:10, position:'absolute', left:10}}/>
        </View>
      </TouchableHighlight>
  );
  }

  render() {
    const { navigate } = this.props.navigation;
    return(
      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
        <FlatList
          visible={this.state.memories.length!==0}
          data={this.state.memories}
          renderItem={({item}) => this._renderItem(item, {navigate})}

          ItemSeparatorComponent={this.renderSeparator}
        />

      <Image source={this.state.memories.photo} style={{height:83, width:83, marginRight:10, marginTop:10, position:'absolute', left:10}}/>

      <TouchableHighlight underlayColor='rgba(200,200,200,0.8)'
        onPress={() => navigate('AddMemory')} style={{position:'absolute', right:20, bottom:20, height:64, width:64, borderRadius:64/2}}> 
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

export default MemoriesScreen;