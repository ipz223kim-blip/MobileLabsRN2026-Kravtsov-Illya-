import {useEffect} from "react";
import {Stack} from "expo-router";
import * as FileSystem from 'expo-file-system'
import ScreenLayout from "@/components/ScreenLayout";
import {APP_ROOT_DIR} from "@/utils/fsHelper";

export default function RootLayout() {
  useEffect(() => {
    (async () => {
      try {
        const dir = new FileSystem.Directory(APP_ROOT_DIR);
        dir.create({ intermediates: true });
      } catch (e) {
        console.error('Помилка створення AppData:', e);
      }
    })();
  }, []);

  return (
    <ScreenLayout>
      <Stack>
        <Stack.Screen name="index" options={{title: 'Файловий менеджер'}}/>
        <Stack.Screen name="fileView" options={{title: 'Перегляд файлу'}}/>
        <Stack.Screen name="fileEdit" options={{title: 'Редагування файлу'}}/>
      </Stack>
    </ScreenLayout>
  )
}
