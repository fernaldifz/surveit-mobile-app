import { View } from "react-native";
import SurveyCard from "@components/Survey/SurveyCard";

const MySurvey = ({ navigation }) => {
  return (
    <View style={{ padding: 20 }}>
      <SurveyCard />
    </View>
  );
};

export default MySurvey;
