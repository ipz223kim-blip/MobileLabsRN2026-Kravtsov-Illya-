import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopScreen from '../screens/shop';
import CommunityScreen from '../screens/communityjs';
import ChatScreen from '../screens/chat';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Shop" component={ShopScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
}