import {
  View,
  Text,
  SectionList,
  Image,
  StyleSheet,
} from 'react-native';

const contacts = [
  {
    title: 'Друзі онлайн',
    data: [
      {
        id: '1',
        nickname: 'Svinopas',
        message: 'Грає в Battlefield 4',
        avatar: require('../assets/images/avatar-1.png'),
      },
      {
        id: '2',
        nickname: 'Вовчик Хреста',
        message: 'Пише повідомлення...',
        avatar: require('../assets/images/avatar-2.png'),
      },
    ],
  },
  {
    title: 'Недавні чати',
    data: [
      {
        id: '3',
        nickname: 'Factory',
        message: 'Завод має рости',
        avatar: require('../assets/images/factorio.png'),
      },
    ],
  },
];

export default function ContactsScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.contactCard}>
      <Image source={item.avatar} style={styles.avatar} />

      <View style={styles.contactInfo}>
        <Text style={styles.nickname}>{item.nickname}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </View>
  );

  const renderSectionHeader = ({ section }) => (
    <Text style={styles.sectionHeader}>{section.title}</Text>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={contacts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
  listContent: {
    padding: 16,
  },
  sectionHeader: {
    color: '#66c0f4',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 14,
    marginBottom: 10,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1b2838',
    padding: 12,
    borderRadius: 12,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  contactInfo: {
    marginLeft: 14,
    flex: 1,
  },
  nickname: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  message: {
    color: '#c7d5e0',
    marginTop: 5,
    fontSize: 13,
  },
  separator: {
    height: 12,
  },
});