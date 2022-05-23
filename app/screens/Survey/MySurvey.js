import { ScrollView, View } from "react-native";
import { useEffect, useState } from "react";
import SurveyCard from "@components/Survey/SurveyCard";
import { getUserSurvey } from "@services/SurveyServices";
import { auth } from "@config";

const MySurvey = ({ route, navigation }) => {
  const [survey, setSurvey] = useState([]);

  const fetchSurvey = async (type) => {
    let data = await getUserSurvey(auth.currentUser.uid, type);
    setSurvey(data);
  };

  useEffect(() => {
    fetchSurvey(route.params?.type);
  }, [route.params?.type]);

  return (
    <ScrollView style={{ padding: 20 }} showsVerticalScrollIndicator={false}>
      {survey &&
        survey.map((item, index) => (
          <SurveyCard
            key={index}
            {...item}
            navigation={navigation}
            data={item}
            page="MySurvey"
          />
        ))}
      <View style={{ marginBottom: 20 }} />
    </ScrollView>
  );
};

export default MySurvey;
