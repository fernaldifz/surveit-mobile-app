import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const BarChartSummary = ({ data, question }) => {
	const chartConfig = {
		fillShadowGradient: '#ffffff',
		fillShadowGradientOpacity: 1,
		backgroundColorFromOpacity: 0,
		backgroundColorToOpacity: 0,
		color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
		strokeWidth: 2, // optional, default 3
		barPercentage: 0.5,
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
						<BarChart
							data={data}
							width={320}
							height={220}
							yAxisLabel="$"
							backgroundColor={'transparent'}
							chartConfig={chartConfig}
							verticalLabelRotation={30}
						/>
					</View>
				)}
			</View>
		</View>
	);
};

export default BarChartSummary;

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
