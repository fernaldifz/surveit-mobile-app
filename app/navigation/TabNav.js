import Profile from "@screens/Profile/Profile";
import Home from "@screens/Home";
import CreateSurvey from "@screens/CreateSurvey";

import homeOutline from "@assets/home.png";
import homeSolid from "@assets/home-solid.png";
import userOutline from "@assets/user.png";
import userSolid from "@assets/user-solid.png";
import plusPic from "@assets/plus.png";

import { AddSurveyButton } from "./SurveyButton";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Image, TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();

export const NavigationBar = () => {
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
                alignSelf: "center",
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
        component={CreateSurvey}
        options={({ _ }) => ({
          headerTitleAlign: "center",
          tabBarIcon: ({ _ }) => (
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
        })}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("CreateSurvey");
          },
        })}
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
                alignSelf: "center",
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
