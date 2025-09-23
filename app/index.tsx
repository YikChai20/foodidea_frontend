import React, { useState } from 'react';
import AuthScreen from "./views/AuthScreen/AuthScreen";
// import MenuScreen from "./views/MenuScreen/MenuScreen";
import HomeScreen from './views/HomeScreen/HomeScreen';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <>
      {isAuthenticated ? (
        // <MenuScreen />
        <HomeScreen />
      ) : (
        <AuthScreen onAuthSuccess={handleAuthSuccess} />
      )}
    </>
  );
};

export default Index;
