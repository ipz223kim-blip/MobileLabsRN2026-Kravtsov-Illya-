import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const baseNews = [
  {
    id: '1',
    title: 'Grand Theft Auto V',
    description: 'Популярна гра з відкритим світом, яка доступна для Windows.',
    image: require('../assets/images/gta.png'),
  },
  {
    id: '2',
    title: 'Battlefield 4',
    description: 'Шутер з великими мапами, технікою та командними боями.',
    image: require('../assets/images/battlefield.png'),
  },
  {
    id: '3',
    title: 'Factorio',
    description: 'Гра про автоматизацію виробництва, логістику та розвиток фабрики.',
    image: require('../assets/images/factorio.png'),
  },
  {
    id: '4',
    title: 'Horizon Zero Dawn',
    description: 'Пригодницька гра у світі майбутнього з роботизованими істотами.',
    image: require('../assets/images/horizon.png'),
  },
];

function generateNews(start = 1, count = 4) {
  return Array.from({ length: count }, (_, index) => {
    const number = start + index;
    const item = baseNews[index % baseNews.length];

    return {
      ...item,
      id: String(number),
      title: `${item.title} #${number}`,
    };
  });
}

export default function MainScreen({ navigation }) {
  const [news, setNews] = useState(generateNews(1, 4));
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setNews(generateNews(1, 4));
      setRefreshing(false);
    }, 1000);
  };

  const loadMore = () => {
    if (loadingMore) return;

    setLoadingMore(true);

    setTimeout(() => {
      setNews((prev) => [
        ...prev,
        ...generateNews(prev.length + 1, 8),
      ]);

      setLoadingMore(false);
    }, 1000);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetailsScreen', item)}
    >
      <Image source={item.image} style={styles.image} />

      <View style={styles.textBlock}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.more}>Натисніть, щоб відкрити деталі</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={news}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        showsVerticalScrollIndicator={true}
        ListHeaderComponent={
          <View style={styles.headerBlock}>
            <Text style={styles.header}>Список новин Steam</Text>
            <Text style={styles.subtitle}>FlatList: Pull-to-Refresh та Infinite Scroll</Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.footer}>
            {loadingMore ? (
              <>
                <ActivityIndicator />
                <Text style={styles.footerText}>Завантаження нових елементів...</Text>
              </>
            ) : (
              <Text style={styles.footerText}>Догорніть донизу, щоб підвантажити ще новини</Text>
            )}
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={5}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101822',
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  headerBlock: {
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    color: '#c7d5e0',
    marginTop: 6,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1b2838',
    borderRadius: 12,
    overflow: 'hidden',
    padding: 12,
    minHeight: 145,
  },
  image: {
    width: 145,
    height: 115,
    borderRadius: 8,
  },
  textBlock: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  description: {
    color: '#c7d5e0',
    marginTop: 6,
    fontSize: 13,
  },
  more: {
    color: '#66c0f4',
    marginTop: 10,
    fontSize: 12,
  },
  separator: {
    height: 14,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#c7d5e0',
    textAlign: 'center',
    paddingTop: 8,
  },
});
