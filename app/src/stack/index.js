import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SignatureMatch from "../screens/SignatureMatch";
import { Ionicons } from "@expo/vector-icons";
import SearchResultScreen from "../screens/SearchResultScreen";
import CameraScreen from "../screens/CameraScreen";
import ImageEditScreen from "../screens/ImageEditScreen";
import CropPhotoPage from "../screens/text";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

export const AuthenticatedStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, headerTitle: false }}>
      <Stack.Screen name="Main" component={MainTab} />
      <Stack.Screen name="SearchResult" component={SearchResultScreen} />
      {/* <Stack.Screen name="SignatureMatch" component={SignatureMatch} /> */}
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
      {/* <Stack.Screen name="ImageEditScreen" component={ImageEditScreen} /> */}
      <Stack.Screen name="cropPhoto" component={CropPhotoPage} />
    </Stack.Navigator>
  );
};

const MainTab = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        headerTitle: false,
        tabBarStyle: {
          backgroundColor: "black",
          borderTopWidth: 0,
        },
        tabBarIcon: ({ focused, color, size }) => {
          const routerName = route.name;

          switch (routerName) {
            case "Home":
              return (
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  color="white"
                  size={24}
                />
              );
            case "Search":
              return (
                <Ionicons
                  name={focused ? "search" : "search-outline"}
                  color="white"
                  size={24}
                />
              );
            case "Profile":
              return (
                <Ionicons
                  name={focused ? "person" : "person-outline"}
                  color="white"
                  size={24}
                />
              );
          }
        },
      })}
    >
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Search" component={SearchScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
};
