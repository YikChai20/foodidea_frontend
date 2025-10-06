// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import AuthScreen from '../views/AuthScreen/AuthScreen';
import MainMenu from '../views/MenuScreen/MenuScreen';
import SplashScreen from '../../common/SplashScreen/SplashScreen';

// Define navigation types
export type RootStackParamList = {
  Auth: undefined;
  SplashAfterLogin: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="SplashAfterLogin" component={SplashScreen} />
        <Stack.Screen name="Home" component={MainMenu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
