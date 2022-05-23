import {
	View,
	ScrollView,
	TouchableOpacity,
	Image,
	StyleSheet,
	Text,
} from 'react-native';
import Card from '@components/Profile/Card';

import VoucherImage from '@assets/voucher.png';
import pointPic from '@assets/point.png';

import { useEffect, useState } from 'react';
import { getVoucherlist, redeemVoucher } from '@services/ProfileServices';
import { auth } from '@config';

const RedeemPoint = ({ navigation }) => {
	const [voucherList, setVoucherList] = useState([]);

	const Info = ({ point }) => (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				marginTop: 8,
			}}
		>
			<Image style={{ width: 16, height: 16 }} source={pointPic} />
			<View>
				<Text style={[style.p2, { marginLeft: 4 }]}>{point} Poin</Text>
			</View>
		</View>
	);

	const fetchVoucher = async () => {
		let data = await getVoucherlist(auth.currentUser.uid);
		setVoucherList(data);
	};

	const redeem = async (params) => {
		let { id, point } = params;
		let data = await redeemVoucher(auth.currentUser.uid, id, point);

		if (data) {
			navigation.navigate('Voucher');
			alert('Berhasil menukar poin');
		} else {
			alert('Poin tidak cukup');
		}
	};

	useEffect(() => {
		fetchVoucher();
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('Voucher');
					}}
				>
					<Image source={VoucherImage} style={{ width: 18, height: 14 }} />
				</TouchableOpacity>
			),
		});

		const willFocusSubscription = navigation.addListener('focus', () => {
			fetchVoucher();
		});

		return willFocusSubscription;
	}, []);

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			style={{ backgroundColor: '#F8FAFC' }}
		>
			<View style={{ marginTop: 20, alignItems: 'center' }}>
				{voucherList &&
					voucherList.map((item, index) => {
						return (
							<Card
								{...item}
								key={index}
								name={item.name}
								content={<Info point={item.point} />}
								buttonText="Tukar poin"
								handleUse={redeem}
								type="redeem"
							/>
						);
					})}
			</View>
		</ScrollView>
	);
};

const style = StyleSheet.create({
	p2: {
		color: '#F9AD5D',
		lineHeight: 14,
		fontFamily: 'Urbanist_600SemiBold',
		fontSize: 12,
	},
});

export default RedeemPoint;
