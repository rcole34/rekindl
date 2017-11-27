import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const DetailScreen = ({navigation}) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>{navigation.state.params.name}</Text>
  </View>
);

export default DetailScreen;