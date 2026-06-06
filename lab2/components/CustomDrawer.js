import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';

export default function CustomDrawer(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View style={styles.profileBlock}>
        <Image source={require('../assets/images/avatar-main.png')} style={styles.avatar} />
        <Text style={styles.name}>Кравцов Ілля</Text>
        <Text style={styles.group}>Група: ІПЗ-22-3</Text>
      </View>

      <TouchableOpacity style={styles.menuItem} onPress={() => props.navigation.navigate('News')}>
        <Text style={styles.menuText}>Новини</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => props.navigation.navigate('Contacts')}>
        <Text style={styles.menuText}>Контакти</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171a21',
  },
  profileBlock: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2a475e',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  name: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  group: {
    color: '#c7d5e0',
    marginTop: 4,
  },
  menuItem: {
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#2a475e',
  },
  menuText: {
    color: '#ffffff',
    fontSize: 17,
  },
});
