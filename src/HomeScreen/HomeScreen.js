import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
    <FlatList
      data={[
        {key: 'Claire R.'},
        {key: 'John S.'},
        {key: 'Nate G.'},
        {key: 'Ella E.'},
      ]}
      renderItem={({item}) => <Button
        onPress={() => navigation.navigate('Detail', {name: item.key})}
        title={item.key}
      />}
    />
  </View>
);

export default HomeScreen;