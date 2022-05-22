import { ScrollView } from 'react-native';
import TextSummary from '@components/Survey/TextSummary';
import PieChartSummary from '@components/Survey/PieChartSummary';
import BarChartSummary from '@components/Survey/BarChartSummary';

const dummy = [
	{
		id: 1,
		answer: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa',
	},
	{
		id: 2,
		answer: 'B',
	},
	{
		id: 3,
		answer: 'C',
	},
	{
		id: 4,
		answer: 'D',
	},
];

const answers = [
	{
		name: '% Poodle',
		percentage: 20,
		color: '#6E61E8',
		legendFontColor: '#94A3B8',
		legendFontSize: 12,
	},
	{
		name: '% Corgi',
		percentage: 30,
		color: '#A889FF',
		legendFontColor: '#94A3B8',
		legendFontSize: 12,
	},
	{
		name: '% Westi',
		percentage: 10,
		color: '#E86181',
		legendFontColor: '#94A3B8',
		legendFontSize: 12,
	},
	{
		name: '% Pomeranian',
		percentage: 30,
		color: '#F9AD5D',
		legendFontColor: '#94A3B8',
		legendFontSize: 12,
	},
	{
		name: '% Samoyed',
		percentage: 10,
		color: '#4ECDC4',
		legendFontColor: '#94A3B8',
		legendFontSize: 12,
	},
];

const answers2 = {
	labels: ['Anjing', 'Hamster', 'Kucing', 'Ikan', 'Lainnya'],
	datasets: [
		{
			data: [80, 35, 75, 50, 15],
		},
	],
};

const SurveySummary = ({ navigation }) => {
	return (
		<ScrollView style={{ backgroundColor: '#F8FAFC', padding: 20 }}>
			<TextSummary
				data={dummy}
				question={'Siapa namamu?'}
				navigation={navigation}
			/>
			<TextSummary
				data={dummy}
				question={'Siapa namamu?'}
				navigation={navigation}
			/>
			<PieChartSummary
				data={answers}
				question={'Jenis doggy apa yang paling kamu sukai?'}
				navigation={navigation}
			/>
			<BarChartSummary
				data={answers2}
				question={'Hewan apa saja yang pernah kamu pelihara?'}
				navigation={navigation}
			/>
		</ScrollView>
	);
};

export default SurveySummary;
