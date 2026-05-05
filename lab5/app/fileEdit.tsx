import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/types/RootStackParamList';
import {getInfo, readFile, writeFile} from "@/utils/fsHelper";

type FileEditProps = NativeStackScreenProps<RootStackParamList, 'FileEdit'>;

const FileEditScreen: React.FC<FileEditProps> = ({route, navigation}) => {
  const {uri} = route.params;
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const [existing, fileInfo] = await Promise.all([readFile(uri), getInfo(uri)]);
        setText(existing);
        setInfo(fileInfo);
      } catch (e) {
        console.error(e);
        Alert.alert('Помилка', 'Не вдалося завантажити вміст');
      } finally {
        setLoading(false);
      }
    })();
  }, [uri]);

  const handleSave = async () => {
    try {
      await writeFile(uri, text);
      navigation.goBack();
    } catch (e) {
      console.error(e);
      Alert.alert('Помилка', 'Не вдалося зберегти зміни');
    }
  };

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
          <TextInput
            style={styles.input}
            multiline
            value={text}
            onChangeText={setText}
            blurOnSubmit
          />
          <Button title="Зберегти" onPress={handleSave}/>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  infoContainer: {marginBottom: 12},
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 14,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 16
  },
});

export default FileEditScreen;