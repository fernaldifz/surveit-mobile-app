import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const PieChartSummary = ({ data, question }) => {
	const chartConfig = {
		color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
		useShadowColorFromDataset: false, // optional
	};

	return (
		<View style={{ marginBottom: 32 }}>
			<View style={{ marginBottom: 16 }}>
				<Text style={[style.p1, { marginBottom: 8 }]}>{question}</Text>
				<Text style={style.p2}>{data.length} respon</Text>
			</View>
			<View style={{ alignItems: 'center' }}>
				{data && (
					<View style={style.answer}>
						<PieChart
							data={data}
							width={320}
							height={200}
							chartConfig={chartConfig}
							accessor={'percentage'}
							backgroundColor={'transparent'}
							center={[0, 0]}
							absolute
						/>
					</View>
				)}
			</View>
		</View>
	);
};

export default PieChartSummary;

const style = StyleSheet.create({
	answer: {
		width: '100%',
		backgroundColor: '#fff',
		justifyContent: 'center',
		paddingHorizontal: 16,
		paddingVertical: 14,
		marginBottom: 8,
		borderRadius: 12,
		maxHeight: 200,
	},
	p1: {
		fontSize: 16,
		lineHeight: 20,
		fontFamily: 'Urbanist_500Medium',
		color: '#475569',
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: 'rgba(110, 97, 232, 0.1)',
		height: 32,
		borderRadius: 20,
		marginTop: 8,
		paddingHorizontal: 12,
	},
	image: {
		width: 10,
		height: 10,
		marginLeft: 6,
	},
	button2: {
		fontSize: 12,
		lineHeight: 24,
		fontFamily: 'Urbanist_600SemiBold',
		color: '#6E61E8',
	},
	p2: {
		color: '#94A3B8',
		lineHeight: 14,
		fontFamily: 'Urbanist_600SemiBold',
		fontSize: 12,
	},
});
