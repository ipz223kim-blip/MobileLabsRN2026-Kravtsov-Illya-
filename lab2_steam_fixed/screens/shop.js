import React from 'react';
import { FlatList, Text, View, Image, StyleSheet } from 'react-native';

const games = [
  { id: '1', title: 'Dead Cells', image: require('../assets/deadcells.jpg') },
  { id: '2', title: 'Hades', image: require('../assets/hades.jpg') },
  { id: '3', title: 'Stardew Valley', image: require('../assets/stardew.jpg') },
];

export default function ShopScreen() {
  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: { margin: 10 },
  image: { width: 200, height: 100 },
  title: { color: '#000', fontSize: 16, marginTop: 4 },
});