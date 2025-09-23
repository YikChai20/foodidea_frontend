import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthScreen from "../views/AuthScreen/AuthScreen";
import MainMenu from "../views/MenuScreen/MenuScreen";

const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <MainMenu />
      ) : (
        <AuthScreen onAuthSuccess={handleAuthSuccess} />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
