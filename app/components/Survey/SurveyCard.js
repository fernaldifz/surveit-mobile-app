import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import pointPic from '@assets/point.png';

const SurveyCard = ({
	title,
	point,
	numQuestion,
	cover,
	navigation,
	data,
	page,
}) => {
	return (
		// changes
		<TouchableOpacity
			style={style.container}
			onPress={() =>
				(page = 'home'
					? navigation.navigate('MySurveyDetail', data)
					: navigation.navigate('MySurveyDetail', data))
			}
		>
			<Image style={style.image} source={{ uri: cover }} />
			<View style={{ padding: 12 }}>
				<Text style={style.h3}>{title}</Text>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						gap: 4,
						alignItems: 'center',
					}}
				>
					<Image style={{ width: 16, height: 16 }} source={pointPic} />
					<View style={{ display: 'flex', flexDirection: 'row' }}>
						<Text style={[style.p2, { color: '#F9AD5D' }]}>{point} poin </Text>
						<Text style={[style.p2, { color: '#94A3B8' }]}>
							• {numQuestion} pertanyaan
						</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const style = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		borderRadius: 20,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowRadius: 16,
		shadowColor: '#7F5D70',
		elevation: 8,
		marginBottom: 20,
	},

	image: {
		width: '100%',
		height: 320,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		height: 100,
		resizeMode: 'cover',
	},

	h3: {
		fontSize: 16,
		lineHeight: 20,
		fontFamily: 'Urbanist_600SemiBold',
		color: '#475569',
		marginBottom: 8,
	},

	p2: {
		color: '#F9AD5D',
		lineHeight: 14,
		fontFamily: 'Urbanist_600SemiBold',
		fontSize: 12,
	},
});

export default SurveyCard;
