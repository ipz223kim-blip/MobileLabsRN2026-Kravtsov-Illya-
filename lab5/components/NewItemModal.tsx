import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  onCreateFolder: (name: string) => Promise<void>;
  onCreateFile: (name: string, content: string) => Promise<void>;
};

const NewItemModal: React.FC<Props> = ({ visible, onClose, onCreateFolder, onCreateFile }) => {
  const [mode, setMode] = useState<'folder' | 'file'>('folder');
  const [name, setName] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleCreate = async () => {
    if (!name.trim()) {
      Alert.alert('Помилка', 'Введіть назву.');
      return;
    }
    try {
      if (mode === 'folder') {
        await onCreateFolder(name.trim());
      } else {
        await onCreateFile(name.trim(), content);
      }
      setName('');
      setContent('');
      onClose();
    } catch (e) {
      console.error(e);
      Alert.alert('Помилка', `Не вдалося створити ${mode}`);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <Text style={styles.title}>Створити новий елемент</Text>
          <View style={styles.toggleRow}>
            <TouchableOpacity onPress={() => setMode('folder')}>
              <Text style={[styles.toggleText, mode === 'folder' && styles.active]}>Папку</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMode('file')}>
              <Text style={[styles.toggleText, mode === 'file' && styles.active]}>Файл</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder={mode === 'folder' ? 'Назва папки' : 'Назва файлу без .txt'}
            value={name}
            onChangeText={setName}
          />
          {mode === 'file' && (
            <TextInput
              style={[styles.input, styles.contentInput]}
              placeholder="Початковий вміст"
              value={content}
              onChangeText={setContent}
              multiline
            />
          )}
          <View style={styles.buttonsRow}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text>Скасувати</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleCreate}>
              <Text>Створити</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
  toggleText: { fontSize: 16, color: '#555' },
  active: { fontWeight: 'bold', textDecorationLine: 'underline' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
  contentInput: { height: 80, textAlignVertical: 'top' },
  buttonsRow: { flexDirection: 'row', justifyContent: 'flex-end' },
  button: { marginLeft: 16 },
});

export default NewItemModal;
