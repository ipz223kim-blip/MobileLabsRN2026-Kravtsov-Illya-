import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import { ThemeProviderWrapper } from './theme/theme';

export default function App() {
  return (
    <ThemeProviderWrapper>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </ThemeProviderWrapper>
  );
}
