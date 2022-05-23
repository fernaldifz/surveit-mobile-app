import { ScrollView, Text } from "react-native";
import { useEffect, useState } from "react";

import TextSummary from "@components/Survey/TextSummary";
import PieChartSummary from "@components/Survey/PieChartSummary";
import BarChartSummary from "@components/Survey/BarChartSummary";
import { getAnswer, getQuestion } from "@services/SurveyServices";
import { mapAnswer } from "../../utils";

const dummy = [
  {
    id: 1,
    answer: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa",
  },
  {
    id: 2,
    answer: "B",
  },
  {
    id: 3,
    answer: "C",
  },
  {
    id: 4,
    answer: "D",
  },
];

const answers = [
  {
    name: "% Poodle",
    percentage: 20,
    color: "#6E61E8",
    legendFontColor: "#94A3B8",
    legendFontSize: 12,
  },
  {
    name: "% Corgi",
    percentage: 30,
    color: "#A889FF",
    legendFontColor: "#94A3B8",
    legendFontSize: 12,
  },
  {
    name: "% Westi",
    percentage: 10,
    color: "#E86181",
    legendFontColor: "#94A3B8",
    legendFontSize: 12,
  },
  {
    name: "% Pomeranian",
    percentage: 30,
    color: "#F9AD5D",
    legendFontColor: "#94A3B8",
    legendFontSize: 12,
  },
  {
    name: "% Samoyed",
    percentage: 10,
    color: "#4ECDC4",
    legendFontColor: "#94A3B8",
    legendFontSize: 12,
  },
];

const answers2 = {
  labels: ["Anjing", "Hamster", "Kucing", "Ikan", "Lainnya"],
  datasets: [
    {
      data: [80, 35, 75, 50, 15],
    },
  ],
};

const SurveySummary = ({ route, navigation }) => {
  const { id } = route.params;
  const [data, setData] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [question, setQuestion] = useState(null);

  const fetchData = async () => {
    let answer = await getAnswer(id);
    let question = await getQuestion(id);

    setAnswer(answer);
    setQuestion(question);
  };

  useEffect(() => {
    fetchData();

    if (answer && question) {
      let newData = mapAnswer(answer, question);
      setData(newData);
    }
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#F8FAFC", padding: 20 }}>
      {data &&
        data.map((item, index) => {
          switch (item.type) {
            default:
              return (
                <TextSummary
                  data={item.answer}
                  question={item.question}
                  navigation={navigation}
                />
              );
          }
        })}
    </ScrollView>
  );
};

export default SurveySummary;
