import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { Overlay } from "react-native-elements";
import * as Clipboard from "expo-clipboard";

import Card from "@components/Profile/Card";
import { getUserVoucher } from "@services/ProfileServices";

// TODO Change to current user
const user = "naheedo";

const Voucher = ({ navigation }) => {
  const [voucherList, setVoucherList] = useState([]);
  const [visible, setVisiblle] = useState(false);
  const [code, setCode] = useState("");

  const Info = ({ due }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
      }}
    >
      <View>
        <Text style={[style.p2, { marginLeft: 4 }]}>Berlaku s/d {due}</Text>
      </View>
    </View>
  );

  // const dummy = [
  //   {
  //     id: 1,
  //     name: "Voucher 1",
  //     point: 100,
  //     due: "20/12/2020",
  //     code: "GOJEKINAJA",
  //   },
  // ];

  const fetchVoucher = async () => {
    let data = await getUserVoucher(user);
    console.log(data);
    setVoucherList(data);
  };

  useEffect(() => {
    fetchVoucher();
  }, []);

  const handleUse = (code) => {
    setVisiblle(true);
    setCode(code);
  };

  const copyClipboard = async () => {
    await Clipboard.setString(code);
    setVisiblle(false);
    alert("Kode voucher berhasil disalin");
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#F8FAFC" }}
    >
      <View style={{ marginTop: 20, alignItems: "center" }}>
        {voucherList &&
          voucherList.map((item, index) => {
            return (
              <Card
                key={index}
                {...item}
                content={<Info due={item.due} />}
                buttonText="Gunakan"
                handleUse={handleUse}
                type="voucher"
              />
            );
          })}
      </View>
      <Overlay
        overlayStyle={style.modal}
        isVisible={visible}
        onBackdropPress={() => setVisiblle(false)}
      >
        <Text style={style.h2}>Kode Promo</Text>
        <Text style={style.h1}> {code}</Text>
        <TouchableOpacity style={style.button} onPress={() => copyClipboard()}>
          <Text style={[style.button1, { color: "#fff" }]}>Salin Kode</Text>
        </TouchableOpacity>
      </Overlay>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  p2: {
    color: "#94A3B8",
    lineHeight: 14,
    fontFamily: "Urbanist_600SemiBold",
    fontSize: 12,
  },
  modal: {
    width: 320,
    height: 236,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  h1: {
    flex: 1,
    fontSize: 24,
    lineHeight: 28,
    fontFamily: "Urbanist_600SemiBold",
    color: "#475569",
  },
  h2: {
    flex: 1,
    fontSize: 20,
    lineHeight: 24,
    fontFamily: "Urbanist_600SemiBold",
    color: "#475569",
  },
  button1: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_600SemiBold",
    color: "#6E61E8",
  },
  button: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: "#6E61E8",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 56,
  },
});

export default Voucher;
