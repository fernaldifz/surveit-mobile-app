import { View, ScrollView } from "react-native";
import Card from "@components/Profile/Card";

const Voucher = () => {
  const dummy = [
    {
      name: "Voucher A",
      point: "100",
    },
    {
      name: "Voucher B",
      point: "200",
    },
    {
      name: "Voucher C",
      point: "300",
    },
    {
      name: "Voucher D",
      point: "400",
    },
    {
      name: "Voucher E",
      point: "500",
    },
  ];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#F8FAFC" }}
    >
      <View style={{ marginTop: 20, alignItems: "center" }}>
        {dummy.map((item, index) => {
          return <Card key={index} {...item} />;
        })}
      </View>
    </ScrollView>
  );
};

export default Voucher;
