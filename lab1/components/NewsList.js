import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ImageBackground } from 'react-native';

const news = [
  { title: 'Турнір UA Hammer Cup', date: '10.06.2026', preview: 'Фінал відбувся у Wik.' },
  { title: 'Огляд нових марінів', date: '07.06.2026', preview: 'Чи краще вони за карланів?' },
  { title: 'Новий FAQ', date: '05.06.2026', preview: 'Огляд мети.' },
];

export default function NewsScreen({ navigate }) {
  return (
    <View style={{ flex: 1, paddingTop: 30  }}>
      <View style={styles.headerRed}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.headerTextRed}>UA Hammer</Text>
        <TouchableOpacity onPress={() => navigate('register')}>
          <Image source={require('../assets/user-icon-L.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.headerWhite}>
        <TouchableOpacity>
        <Text style={styles.menuItem}>Новини</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('gallery')}>
          <Text style={styles.menuItem}>Галерея</Text>
        </TouchableOpacity>
      </View>

      <ImageBackground source={require('../assets/fon.png')} style={styles.bg} resizeMode="cover">
        <Text style={styles.screenTitle}>Новини</Text>
        <ScrollView>
          {news.map((item, i) => (
            <View key={i} style={styles.newsItem}>
              <Image source={require('../assets/snack-icon.png')} style={styles.image} />
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.preview}>{item.preview}</Text>
              </View>
            </View>
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
    width: '100%',
  },
  screenTitle: {
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  newsItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.9)',
    marginBottom: 10,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
    color: '#111',
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  preview: {
    fontSize: 14,
    color: '#111',
  },
});


