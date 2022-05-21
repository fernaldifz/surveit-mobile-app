import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
} from "@expo-google-fonts/urbanist";
import { StackNav } from "./app/navigation";

import cheveronLeft from "@assets/cheveron-left.png";
import { Image, TouchableOpacity } from "react-native";

const Stack = createNativeStackNavigator();

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
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={cheveronLeft} style={{ width: 24, height: 24 }} />
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
        {StackNav &&
          StackNav.map((item, index) => {
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
  );
};

export default App;
