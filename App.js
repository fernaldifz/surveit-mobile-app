import React from "react";
import Home from "./app/screens/Home";
import Guide from "./app/screens/Guide";
import SurveyCategory from "./app/screens/SurveyCategory";
import SurveyRecommendation from "./app/screens/SurveyRecommendation";
import SignUp from "./app/screens/SignUp";
import LogIn from "./app/screens/LogIn";
import Profile from "./app/screens/Profile";

import homeOutline from "./app/assets/home.png";
import homeSolid from "./app/assets/home-solid.png";
import userOutline from "./app/assets/user.png";
import userSolid from "./app/assets/user-solid.png";
import plusPic from "./app/assets/plus.png";

import { View, Text, Image, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AppLoading from "expo-app-loading";
import {
  useFonts,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
} from "@expo-google-fonts/urbanist";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const AddSurveyButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -16,
      justifyContent: "center",
      alignItems: "center",
      width: 64,
      height: 64,
      backgroundColor: "#6E61E8",
      borderRadius: 20,
      shadowColor: "#7F5D70",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 20,
      shadowOpacity: 0.5,
      elevation: 5,
    }}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);

const NavigationBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 74,
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 17,
              }}
            >
              <Image
                source={focused ? homeSolid : homeOutline}
                resizeMode="contain"
                style={{
                  width: 24,
                  height: 24,
                }}
              />
              <Text
                style={{
                  color: focused ? "#6E61E8" : "#94A3B8",
                  fontFamily: "Urbanist_500Medium",
                  fontSize: 10,
                  lineHeight: 20,
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Add Survey"
        component={Guide}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={plusPic}
              resizeMode="contain"
              style={{
                width: 16,
                height: 16,
              }}
            />
          ),
          tabBarButton: (props) => <AddSurveyButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 17,
              }}
            >
              <Image
                source={focused ? userSolid : userOutline}
                resizeMode="contain"
                style={{
                  width: 24,
                  height: 24,
                }}
              />
              <Text
                style={{
                  color: focused ? "#6E61E8" : "#94A3B8",
                  fontFamily: "Urbanist_500Medium",
                  fontSize: 10,
                  lineHeight: 20,
                }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  let [fontsLoaded] = useFonts({
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={NavigationBar}
          options={{ headerShown: false }}
        />
        {/* // <Stack.Screen
				// 	name="Profile"
				// 	component={Profile}
				// 	options={{ headerShown: false }}
				// />
				// <Stack.Screen
				// 	name="Home"
				// 	component={Home}
				// 	options={{ headerShown: false }}
				// /> */}
        <Stack.Screen
          name="Guide"
          component={Guide}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SurveyCategory"
          component={SurveyCategory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SurveyRecommendation"
          component={SurveyRecommendation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LogIn"
          component={LogIn}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
