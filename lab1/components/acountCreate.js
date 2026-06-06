import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';

export default function AccountCreate({ navigate }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Помилка', 'Заповніть усі поля');
      return;
    }

    const userData = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
    };

    console.log('Дані реєстрації:', userData);

    Alert.alert('Успішно', 'Акаунт створено');

    setName('');
    setEmail('');
    setPassword('');

    navigate('news');
  };

  return (
    <View style={{ flex: 1, paddingTop: 30 }}>
      <View style={styles.headerRed}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.headerTextRed}>UA Hammer</Text>
        <Image source={require('../assets/user-icon-L.png')} style={styles.icon} />
      </View>

      <View style={styles.headerWhite}>
        <TouchableOpacity onPress={() => navigate('news')}>
          <Text style={styles.menuItem}>Новини</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigate('gallery')}>
          <Text style={styles.menuItem}>Галерея</Text>
        </TouchableOpacity>
      </View>

      <ImageBackground
        source={require('../assets/fon.png')}
        style={styles.bg}
        resizeMode="cover"
      >
        <Text style={styles.screenTitle}>Реєстрація</Text>

        <TextInput
          placeholder="Ім'я"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Пароль"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Зареєструватися</Text>
        </TouchableOpacity>
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
  logo: {
    width: 40,
    height: 40,
  },
  icon: {
    width: 40,
    height: 40,
  },
  bg: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  screenTitle: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 12,
    borderRadius: 6,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#a30f0f',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fffb0b',
    fontWeight: 'bold',
    fontSize: 16,
  },
});