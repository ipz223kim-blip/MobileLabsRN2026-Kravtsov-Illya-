import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/types/RootStackParamList';
import {createFile, createFolder, deleteItem, getInfo, readDir} from "@/utils/fsHelper";
import NewItemModal from "@/components/NewItemModal";

interface FileSystemItem {
  name: string;
  uri: string;
  isDirectory: boolean;
  size?: number;
  modificationTime?: number;
}

type ExplorerProps = NativeStackScreenProps<RootStackParamList, 'Explorer'>;

const ExplorerScreen: React.FC<ExplorerProps> = ({navigation, route}) => {
  const {rootDir} = route.params;
  const [currentPath, setCurrentPath] = useState<string>(rootDir);
  const [items, setItems] = useState<FileSystemItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const goUp = () => {
    if (currentPath === rootDir) return;
    const parent = currentPath
      .replace(/\/$/, '')
      .split('/')
      .slice(0, -1)
      .join('/') + '/';
    setCurrentPath(parent);
  };

  const enterFolder = (uri: string) => {
    setCurrentPath(uri);
  };

  const loadDirectory = async (path: string) => {
    setLoading(true);
    try {
      const names = await readDir(path);
      const entries = await Promise.all(
        names.map(async (name) => {
          const uri = path + name + (name.includes('.') ? '' : '/');
          const info = await getInfo(uri);
          return {
            name,
            uri,
            isDirectory: info.isDirectory,
            size: info.size,
            modificationTime: info.modificationTime,
          };
        })
      );
      entries.sort((a, b) => {
        if (a.isDirectory !== b.isDirectory) return a.isDirectory ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
      setItems(entries);
    } catch (error) {
      console.error(error);
      Alert.alert('Помилка', 'Не вдалося прочитати директорію');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDirectory(currentPath);
  }, [currentPath]);

  const handleDelete = (item: FileSystemItem) => {
    Alert.alert(
      'Підтвердіть видалення',
      `Ви дійсно хочете видалити «${item.name}»?`,
      [
        {text: 'Скасувати', style: 'cancel'},
        {
          text: 'Видалити',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteItem(item.uri);
              loadDirectory(currentPath);
            } catch (e) {
              console.error(e);
              Alert.alert('Помилка', 'Не вдалося видалити файл/папку');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {currentPath !== rootDir && (
          <TouchableOpacity onPress={goUp} style={styles.backButtonContainer}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.pathText}>{currentPath.replace(rootDir, '') || '/'}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.addButton}>＋</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={styles.loader}/>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.uri}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                item.isDirectory
                  ? enterFolder(item.uri)
                  : navigation.navigate('FileView', {uri: item.uri})
              }
              onLongPress={() => handleDelete(item)}
            >
              <Text style={[styles.itemText, item.isDirectory && styles.folderText]}>
                {item.isDirectory ? '📁 ' : '📄 '} {item.name}
              </Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
        />
      )}

      <NewItemModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreateFolder={async (name) => {
          await createFolder(currentPath, name);
          loadDirectory(currentPath);
        }}
        onCreateFile={async (name, content) => {
          await createFile(currentPath, name, content);
          loadDirectory(currentPath);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonContainer: {paddingRight: 16},
  backButton: {fontSize: 24},
  container: {flex: 1, padding: 16},
  header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8},
  pathText: {fontSize: 16, fontWeight: 'bold'},
  addButton: {fontSize: 24, padding: 4},
  loader: {marginTop: 20},
  itemText: {fontSize: 14, paddingVertical: 8},
  folderText: {fontWeight: '600'},
  separator: {height: 1, backgroundColor: '#ccc'},
});

export default ExplorerScreen;