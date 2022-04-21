import React from 'react';
import surveitLogo from '../assets/surveit-home.png';
import { StyleSheet, Button, TextInput, View, Image, Text } from 'react-native';

const Home = ({ navigation }) => {
	return (
		<View style={{ alignItems: 'center' }}>
			<Image style={styles.image} source={surveitLogo} />
		</View>
	);
};

const styles = StyleSheet.create({
	h1: {
		fontSize: 24,
		lineHeight: 28,
		marginTop: 54,
		marginBottom: 36,
	},
	image: {
		marginTop: 44,
		alignItems: 'center',
		width: 89,
		height: 32,
		resizeMode: 'contain',
	},
});

export default Home;
