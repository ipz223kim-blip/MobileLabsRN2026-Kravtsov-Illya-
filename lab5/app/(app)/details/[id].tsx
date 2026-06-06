import { products } from '@/data/products';
import { useLocalSearchParams } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
export default function DetailsScreen() {
  const { id } = useLocalSearchParams();

  const product = products.find(
    (item) => item.id === id
  );

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Товар не знайдено</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image
        source={product.image}
        style={styles.image}
      />

      <Text style={styles.name}>
        {product.name}
      </Text>

      <Text style={styles.price}>
        {product.price} грн
      </Text>

      <Text style={styles.description}>
        {product.description}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 20,
    color: '#007AFF',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
});