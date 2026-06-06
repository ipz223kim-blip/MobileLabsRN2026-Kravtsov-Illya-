import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import GestureObject from "@/components/GestureObject";
import {useGameContext} from "@/context/GameContext";
import {RootStackParamList} from "@/types/RootStackParamList ";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {GestureHandlerRootView} from "react-native-gesture-handler";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

export default function HomeScreen({navigation}: Props) {
  const {state, recordAction} = useGameContext();
  const {score} = state;

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
      <GestureHandlerRootView>

        <GestureObject
          onSingleTap={() => recordAction('singleTap', 1)}
          onDoubleTap={() => recordAction('doubleTap', 2)}
          onLongPress={() => recordAction('longPress', 5)}
          onPan={() => recordAction('pan', 0)}
          onFlingRight={() => recordAction('flingRight', 0)}
          onFlingLeft={() => recordAction('flingLeft', 0)}
          onPinch={() => recordAction('pinch', 3)}
        />
      </GestureHandlerRootView>
      <Button title="Завдання" onPress={() => navigation.navigate('Tasks')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  score: {fontSize: 32, marginBottom: 20},
});
