import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, Text } from 'react-native';

import MainScreen from '../screens/MainScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ContactsScreen from '../screens/ContactsScreen';
import CustomDrawer from '../components/CustomDrawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function NewsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={({ navigation }) => ({
          title: 'Новини',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.getParent()?.openDrawer()}
              style={{ marginLeft: 15 }}
            >
              <Text style={{ fontSize: 26 }}>☰</Text>
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={({ route }) => ({
          title: route.params?.title || 'Деталі',
        })}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Drawer.Screen
          name="News"
          component={NewsStack}
          options={{
            title: 'Новини',
          }}
        />

        <Drawer.Screen
          name="Contacts"
          component={ContactsScreen}
          options={{
            headerShown: true,
            title: 'Контакти',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}