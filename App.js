import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { MenuProvider } from "react-native-popup-menu";

import { onAuthStateChanged } from "firebase/auth";

import AppLoading from "expo-app-loading";
import {
  useFonts,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
} from "@expo-google-fonts/urbanist";

import cheveronLeft from "@assets/cheveron-left.png";
import { LoggedInStack, AuthStack } from "@navigation";
import { auth } from "@config";

const Stack = createNativeStackNavigator();

const App = () => {
  let [fontsLoaded] = useFonts({
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
  });

  const [stack, setStack] = useState(AuthStack);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setStack(LoggedInStack);
    } else {
      setStack(AuthStack);
    }
  });

  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({ navigation }) => ({
            headerTitleAlign: "center",
            headerLeft: () => (
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => navigation.goBack()}
              >
                <Image
                  source={cheveronLeft}
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>
            ),
            headerTitleStyle: {
              fontFamily: "Urbanist_600SemiBold",
              fontSize: 16,
              lineHeight: 20,
              color: "#475569",
            },
            headerStyle: {
              height: 56,
            },
            headerShadowVisible: false,
          })}
        >
          {stack &&
            stack.map((item, index) => {
              return (
                <Stack.Screen
                  key={index}
                  name={item.name}
                  component={item.component}
                  options={item.options}
                />
              );
            })}
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
};

export default App;
