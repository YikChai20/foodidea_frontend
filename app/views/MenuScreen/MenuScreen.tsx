import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../HomeScreen/HomeScreen";

const Drawer = createDrawerNavigator();

const MenuScreen = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="XXX" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default MenuScreen;
