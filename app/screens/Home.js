import React from 'react';
import surveitLogo from '../assets/surveit-home.png';
import guideBG from '../assets/guide-bg.png';
import {
	StyleSheet,
	Button,
	TextInput,
	View,
	Image,
	Text,
	ImageBackground,
} from 'react-native';

const Home = ({ navigation }) => {
	return (
		<View style={{ alignItems: 'center' }}>
			<Image style={styles.image} source={surveitLogo} />
			<View
				style={{
					alignItems: 'center',
					borderRadius: 20,
					overflow: 'hidden',
					marginTop: 20,
				}}
			>
				<ImageBackground style={styles.cardImage} source={guideBG}>
					<View style={styles.seeGuideButton}>
						<Button color="#6E61E8" title="Lihat panduan" />
					</View>
				</ImageBackground>
			</View>
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
	seeGuideButton: {
		width: 140,
		position: 'absolute',
		top: 88,
		left: 20,
		borderRadius: 12,
		overflow: 'hidden',
		backgroundColor: '#ffffff',
	},
	cardImage: {
		width: 335,
		height: 148,
		resizeMode: 'contain',
	},
});

export default Home;
