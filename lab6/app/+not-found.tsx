import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Екран не знайдено
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/' as any)}
      >
        <Text style={styles.buttonText}>
          Повернутися на головну
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});