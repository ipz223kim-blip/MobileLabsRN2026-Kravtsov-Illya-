import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProviderWrapper } from './themes';
import Tabs from './components/tab';

export default function App() {
  return (
    <ThemeProviderWrapper>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </ThemeProviderWrapper>
  );
}