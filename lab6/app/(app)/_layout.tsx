import { useAuth } from '@/context/AuthContext';
import { Redirect, Stack } from 'expo-router';
export default function AppLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href={'/(auth)/login' as any} />;
  }
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'Профіль користувача' }}
      />
    </Stack>
  );
}