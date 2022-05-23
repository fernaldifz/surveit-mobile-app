import { ScrollView } from "react-native";
import { useEffect, useState } from "react";

import TextSummary from "@components/Survey/TextSummary";
import PieChartSummary from "@components/Survey/PieChartSummary";
import BarChartSummary from "@components/Survey/BarChartSummary";
import { getData } from "@services/SurveyServices";

const SurveySummary = ({ route, navigation }) => {
  const { id } = route.params;
  const [data, setData] = useState(null);

  const fetchData = async () => {
    let res = await getData(id);
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#F8FAFC", padding: 20 }}>
      {data &&
        data.map((item, index) => {
          switch (item.type) {
            case "Pilihan ganda":
              return (
                <PieChartSummary
                  key={index}
                  data={item.answer}
                  question={item.question}
                  navigation={navigation}
                />
              );
            case "Kotak centang":
            case "Skala linier":
              return (
                <BarChartSummary
                  key={index}
                  data={item.answer}
                  question={item.question}
                  navigation={navigation}
                />
              );
            case "Paragraph":
            case "Jawaban singkat":
              return (
                <TextSummary
                  key={index}
                  data={item.answer}
                  question={item.question}
                  navigation={navigation}
                />
              );
            default:
              break;
          }
        })}
    </ScrollView>
  );
};

export default SurveySummary;
