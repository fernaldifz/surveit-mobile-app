import React from 'react';
import SignUp from './app/screens/SignUp';
import LogIn from './app/screens/LogIn';
import Home from './app/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
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
