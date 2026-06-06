import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import NewsScreen from './components/NewsList';
import GalleryScreen from './components/galery';
import AccountCreate from './components/acountCreate';

export default function App() {
  const [screen, setScreen] = useState('news');

  return (
    <View style={styles.container}>
      {screen === 'news' && <NewsScreen navigate={setScreen} />}
      {screen === 'gallery' && <GalleryScreen navigate={setScreen} />}
      {screen === 'register' && <AccountCreate navigate={setScreen} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});



