import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import HomeScreen from "./views/HomeScreen";
import DetailsScreen from "./views/DetailsScreen";
import PokemonsList from "./views/PokemonsList";
import SearchScreen from "./views/SearchScreen";
import InicioScreen from "./views/InicioScreen";

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator initialRouteName="InicioScreen">
    <HomeStack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      name="DetailsScreen"
      component={DetailsScreen}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      name="PokemonsList"
      component={PokemonsList}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      name="InicioScreen"
      component={InicioScreen}
      options={{ headerShown: false }}
    />
  </HomeStack.Navigator>
);

const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen
      name="SearchScreen"
      component={SearchScreen}
      options={{ headerShown: false }}
    />
  </SearchStack.Navigator>
);

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen name="Search" component={SearchStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="search" size={24} color="black" />
          ),
        }} />
    </Tab.Navigator>
  );
};

function Navigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

export default Navigation;
