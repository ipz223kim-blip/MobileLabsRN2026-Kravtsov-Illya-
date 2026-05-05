import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getInfo, readFile} from "@/utils/fsHelper";
import {RootStackParamList} from "@/types/RootStackParamList";

type FileViewProps = NativeStackScreenProps<RootStackParamList, 'FileView'>;

const FileViewScreen: React.FC<FileViewProps> = ({route, navigation}) => {
  const {uri} = route.params;
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const [text, fileInfo] = await Promise.all([readFile(uri), getInfo(uri)]);
        setContent(text);
        setInfo(fileInfo);
      } catch (e) {
        console.error(e);
        Alert.alert('Помилка', 'Не вдалося відкрити файл');
      } finally {
        setLoading(false);
      }
    })();
  }, [uri]);

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    const k = bytes / 1024;
    if (k < 1024) return `${k.toFixed(2)} KB`;
    const m = k / 1024;
    if (m < 1024) return `${m.toFixed(2)} MB`;
    const g = m / (1024 * 1024);
    return `${g.toFixed(2)} GB`;
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large"/>
      ) : (
        <>
          {info && (
            <View style={styles.infoContainer}>
              <Text>Назва: {uri.split('/').pop()}</Text>
              <Text>Розмір: {formatBytes(info.size || 0)}</Text>
              <Text>Дата модифікації: {new Date((info.modificationTime || 0) * 1000).toLocaleString()}</Text>
            </View>
          )}
          <ScrollView style={styles.scroll}>
            <Text style={styles.text}>{content}</Text>
          </ScrollView>
          <Button title="Редагувати" onPress={() => navigation.navigate('FileEdit', {uri})}/>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  infoContainer: {marginBottom: 12},
  scroll: {flex: 1, marginBottom: 16},
  text: {fontSize: 14, lineHeight: 20},
});

export default FileViewScreen;