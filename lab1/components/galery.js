import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ImageBackground } from 'react-native';

const images = [
  require('../assets/1.jpg'),
  require('../assets/2.jpg'),
  require('../assets/3.jpg'),
  require('../assets/4.jpg'),
  require('../assets/5.jpg'),
  require('../assets/6.jpg'),
];

export default function GalleryScreen({ navigate }) {
  return (
    <View style={{ flex: 1, paddingTop: 30 }}>
      <View style={styles.headerRed}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.headerTextRed}>UA Hammer</Text>
        <TouchableOpacity onPress={() => navigate('register')}>
          <Image source={require('../assets/user-icon-L.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.headerWhite}>
        <TouchableOpacity onPress={() => navigate('news')}>
          <Text style={styles.menuItem}>Новини</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.menuItem}>Галерея</Text>
        </TouchableOpacity>
      </View>
      <ImageBackground source={require('../assets/fon.png')} style={styles.bg} resizeMode="cover">
        <Text style={styles.screenTitle}>Галерея</Text>
        <ScrollView contentContainerStyle={styles.gallery}>
          {images.map((img, i) => (
            <Image key={i} source={img} style={styles.galleryImage} />
          ))}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRed: {
    backgroundColor: '#a30f0f',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  headerTextRed: {
    color: '#fffb0b',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerWhite: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  menuItem: {
    fontSize: 16,
    color: '#111',
  },
  logo: { width: 40, height: 40 },
  icon: { width: 40, height: 40 },
  bg: {
    flex: 1,
    width: '100%'
  },
  screenTitle: {
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  galleryImage: {
    width: '48%',
    height: 150,
    marginBottom: 10,
    borderRadius: 8,
  },
});

