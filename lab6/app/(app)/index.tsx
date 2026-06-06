import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const {
    user,
    logout,
    resetPassword,
    deleteAccount,
  } = useAuth();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    if (!user) return;

    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      setName(data.name || '');
      setAge(data.age || '');
      setCity(data.city || '');
    }
  };

  const saveProfile = async () => {
    if (!user) return;

    await setDoc(doc(db, 'users', user.uid), {
      name,
      age,
      city,
      email: user.email,
    });

    setEditMode(false);
    alert('Профіль збережено');
  };

  const handleDeleteAccount = async () => {
    const success = await deleteAccount(deletePassword);

    if (success) {
      setDeletePassword('');
      setDeleteMode(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.info}>Пошта: {user?.email}</Text>
      <Text style={styles.info}>Ім'я: {name || 'Не вказано'}</Text>
      <Text style={styles.info}>Вік: {age || 'Не вказано'}</Text>
      <Text style={styles.info}>Місто: {city || 'Не вказано'}</Text>

      {editMode && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Ім'я"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Вік"
            value={age}
            onChangeText={setAge}
          />
          <TextInput
            style={styles.input}
            placeholder="Місто"
            value={city}
            onChangeText={setCity}
          />
          <TouchableOpacity style={styles.mainButton} onPress={saveProfile}>
            <Text style={styles.buttonText}>Зберегти профіль</Text>
          </TouchableOpacity>
        </>
      )}

      {!editMode && (
        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => setEditMode(true)}
        >
          <Text style={styles.buttonText}>Редагувати профіль</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => resetPassword(user?.email)}
      >
        <Text style={styles.buttonText}>Скинути пароль</Text>
      </TouchableOpacity>

      {!deleteMode && (
        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => setDeleteMode(true)}
        >
          <Text style={styles.buttonText}>Видалити акаунт</Text>
        </TouchableOpacity>
      )}

      {deleteMode && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Введіть пароль для видалення"
            secureTextEntry
            value={deletePassword}
            onChangeText={setDeletePassword}
          />

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleDeleteAccount}
          >
            <Text style={styles.buttonText}>Підтвердити видалення</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => {
              setDeleteMode(false);
              setDeletePassword('');
            }}
          >
            <Text style={styles.buttonText}>Скасувати видалення</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.buttonText}>Вийти</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  info: {
    marginBottom: 10,
    fontSize: 17,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  mainButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#d9534f',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});