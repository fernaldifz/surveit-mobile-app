import React from 'react';
import cheveronLeft from '../assets/cheveron-left.png';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

const SurveyCategory = ({ route, navigation }) => {
	const { itemName } = route.params;
	return (
		<View
			style={{
				alignItems: 'center',
			}}
		>
			<View
				style={{
					backgroundColor: '#ffffff',
					width: '100%',
					height: 80,
					position: 'absolute',
					top: 0,
				}}
			>
				<View
					style={{
						paddingLeft: 20,
						paddingRight: 20,
						paddingTop: 32,
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						textAlign: 'left',
					}}
				>
					<TouchableOpacity onPress={() => navigation.navigate('Home')}>
						<Image style={styles.cheveronLeft} source={cheveronLeft} />
					</TouchableOpacity>
					<View
						style={{
							marginLeft: 'auto',
							marginRight: 'auto',
						}}
					>
						<Text style={styles.h3}>{'Survei ' + itemName}</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	h3: {
		fontSize: 16,
		lineHeight: 20,
		fontFamily: 'Urbanist_600SemiBold',
		color: '#475569',
	},
	cheveronLeft: {
		width: 24,
		height: 24,
	},
});

export default SurveyCategory;
