import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./views/HomeScreen";
import DetailsScreen from "./views/DetailsScreen";

const MainNavigator = createStackNavigator();


function MyStack() {
  return (
    <NavigationContainer>
      <MainNavigator.Navigator initialRouteName="HomeScreen">
        <MainNavigator.Screen name="HomeScreen" component={HomeScreen} 
        options={{
            headerShown: false,
        }
        }/>
        <MainNavigator.Screen name="DetailsScreen" component={DetailsScreen} 
         options={{
            headerShown: false,
        }
        }/>
    
      </MainNavigator.Navigator>
    </NavigationContainer>
  );
}

export default function Navigation() {
  return <MyStack />;
}
