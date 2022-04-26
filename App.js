import React from 'react';
import SignUp from './app/screens/SignUp';
import LogIn from './app/screens/LogIn';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppLoading from 'expo-app-loading';
import {
	useFonts,
	Urbanist_500Medium,
	Urbanist_600SemiBold,
	Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';

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
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={Home}
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
