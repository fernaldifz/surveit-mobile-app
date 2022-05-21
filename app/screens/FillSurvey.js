import React from 'react';
import { useEffect, useState } from 'react';
import {
	StyleSheet,
	Button,
	TextInput,
	View,
	TouchableOpacity,
	Text,
} from 'react-native';

const FillSurvey = ({ route, navigation }) => {
	const { survey_data } = route.params;
	const [answers, setAnswersState] = useState([]);
	const [answer, onChangeAnswer] = useState('');
	const [index, setIndexState] = useState(0);
	const questions = survey_data.question_list;

	const handleFill = () => {
		let tempAnswers = answers;
		tempAnswers[index] = answer;
		setAnswersState(tempAnswers);
		console.log(answers);
	};

	useEffect(() => {
		handleFill();
	}, [answers]);

	return (
		<View style={{ flex: 1 }}>
			<View style={{ marginHorizontal: 20, marginTop: 20, gap: 16, flex: 1 }}>
				{/* shortanswer */}
				<Text style={styles.p1}>
					{questions[index].question}
					{questions[index].required ? '*' : ''}
				</Text>
				<TextInput
					style={styles.respondentInput}
					onChangeText={onChangeAnswer}
					keyboardType="default"
					value={answer}
				/>
			</View>
			<View style={styles.bottomNav}>
				{index == 0 ? (
					<TouchableOpacity disabled={true} style={styles.disabledButton}>
						<Text style={styles.disabledButtonText}>Balik</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						style={styles.backButton}
						onPress={() => setIndexState(index--)}
					>
						<Text style={styles.backButtonText}>Balik</Text>
					</TouchableOpacity>
				)}

				{index == survey_data.question_list.length - 1 ? (
					<TouchableOpacity
						style={styles.nextButton}
						onPress={() => setIndexState(index++)}
					>
						<Text style={styles.nextButtonText}>Lanjut {number}</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						style={styles.nextButton}
						onPress={() => console.log('back ke home')}
					>
						<Text style={styles.nextButtonText}>Selesai</Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	bottomNav: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		padding: 20,
		backgroundColor: '#FFFFFF',
	},
	p1: {
		fontSize: 16,
		lineHeight: 20,
		fontFamily: 'Urbanist_500Medium',
		color: '#475569',
	},
	backButton: {
		fontSize: 16,
		lineHeight: 20,
		fontFamily: 'Urbanist_600SemiBold',
		backgroundColor: 'rgba(110, 97, 232, 0.1)',
		width: 152,
		height: 56,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 12,
		marginRight: 16,
	},
	disabledButton: {
		fontSize: 16,
		lineHeight: 20,
		fontFamily: 'Urbanist_600SemiBold',
		backgroundColor: '#F1F5F9',
		width: 152,
		height: 56,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 12,
		marginRight: 16,
	},
	nextButton: {
		fontSize: 16,
		lineHeight: 20,
		fontFamily: 'Urbanist_600SemiBold',
		backgroundColor: '#6E61E8',
		width: 152,
		height: 56,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 12,
	},
	backButtonText: {
		fontSize: 16,
		lineHeight: 20,
		fontFamily: 'Urbanist_600SemiBold',
		color: '#6E61E8',
	},
	disabledButtonText: {
		fontSize: 16,
		lineHeight: 20,
		fontFamily: 'Urbanist_600SemiBold',
		color: '#94A3B8',
	},
	nextButtonText: {
		fontSize: 16,
		lineHeight: 20,
		fontFamily: 'Urbanist_600SemiBold',
		color: '#FFFFFF',
	},
	respondentInput: {
		height: 48,
		width: 320,
		borderWidth: 1,
		borderColor: '#E2E8F0',
		borderStyle: 'solid',
		borderRadius: 12,
		paddingVertical: 14,
		paddingHorizontal: 16,
		fontSize: 16,
		lineHeight: 20,
		fontFamily: 'Urbanist_500Medium',
		color: '#475569',
	},
});

export default FillSurvey;
