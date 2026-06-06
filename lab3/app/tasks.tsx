import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import {tasks} from "@/data/tasks";
import {useGameContext} from "@/context/GameContext";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/types/RootStackParamList ";

type Props = NativeStackScreenProps<RootStackParamList, 'Tasks'>

export default function TasksScreen({ navigation }: Props) {
  const { state } = useGameContext();
  const { progress } = state;

  const renderItem = ({ item }: { item: typeof tasks[0] }) => {
    const doneCount = Math.min(progress[item.id] ?? 0, item.target);
    const done = doneCount >= item.target;
    return (
      <View style={styles.task}>
        <Text style={[styles.text, done && styles.done]}>
          {item.title} ({doneCount}/{item.target})
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
      <Button title="Назад" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  task: { padding: 12, borderBottomWidth: 1, borderColor: '#ddd' },
  text: { fontSize: 16 },
  done: { textDecorationLine: 'line-through', color: 'gray' },
});