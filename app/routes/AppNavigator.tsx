// src/navigation/AppNavigator.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import SplashScreen from '../../common/SplashScreen/SplashScreen';
import AuthScreen from '../views/AuthScreen/AuthScreen';
import HomeScreen from '../views/HomeScreen/HomeScreen';
import MenuScreen from '../views/MenuScreen/MenuScreen';
// import NotFoundScreen from '../views/NotFoundScreen/NotFoundScreen';
// import ProfileScreen from '../views/ProfileScreen/ProfileScreen'; // Optional

// Define navigation types for Stack and Tabs
export type RootStackParamList = {
  Auth: undefined;
  SplashAfterLogin: undefined;
  pages: undefined;  // For the tab navigator
};

export type MainTabParamList = {
  home: undefined;
  menu: undefined;
  // notFound: undefined;
  // Profile: undefined; // Uncomment if you add Profile screen
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Bottom Tab Navigator with pages: Home, Menu (and optionally Profile)
function pages() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = '';

          if (route.name === 'home') {
            iconName = 'home-outline';
          } else if (route.name === 'menu') {
            iconName = 'restaurant-outline';
          } // else if (route.name === 'Profile') iconName = 'person-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF5733',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
        },
      })}
    >
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="menu" component={MenuScreen} />
       {/* <Tab.Screen name="notFound" component={NotFoundScreen} options={{ tabBarButton: () => null }} /> */}
      {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
}

// **Remove NavigationContainer from here**
const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="SplashAfterLogin" component={SplashScreen} />
      {/* Nest the pages inside stack as Pages */}
      <Stack.Screen name="pages" component={pages} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

