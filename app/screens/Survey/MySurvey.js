import { ScrollView, View } from "react-native";
import { useEffect, useState } from "react";
import SurveyCard from "@components/Survey/SurveyCard";
import { dummyAcc } from "@const";
import { getSurvey } from "@services/SurveyServices";

const MySurvey = ({ route, navigation }) => {
  const [voucher, setVoucher] = useState([]);

  const fetchVoucher = async (type) => {
    let data = await getSurvey(dummyAcc, type);
    setVoucher(data);
  };

  useEffect(() => {
    fetchVoucher(route.params?.type);
  }, [route.params?.type]);

  return (
    <ScrollView style={{paddingVertical: 20}} showsVerticalScrollIndicator={false}>
      {voucher &&
        voucher.map((item, index) => (
          <SurveyCard
            key={index}
            {...item}
            navigation={navigation}
            data={item}
          />
        ))}
      <View style={{ marginBottom: 20 }} />
    </ScrollView>
  );
};

export default MySurvey;
