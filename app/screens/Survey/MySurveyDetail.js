import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useEffect } from "react";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

import kebab from "@assets/kebab-white.png";
import cheveronLeft from "@assets/cheveron-white-left.png";

const MySurveyDetail = ({ route, navigation }) => {
  const { title, cover, numQuestion, description } = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <Menu>
            <MenuTrigger>
              <View style={{ padding: 10 }}>
                <Image source={kebab} />
              </View>
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionText: {
                  fontFamily: "Urbanist_500Medium",
                  fontSize: 14,
                  lineHeight: 20,
                  color: "#475569",
                },
                optionWrapper: {
                  padding: 8,
                },
              }}
            >
              <MenuOption text="Edit survei" />
              <MenuOption text="Hapus survei" />
            </MenuOptions>
          </Menu>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={cheveronLeft} style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView>
        <Image
          source={{
            uri: cover,
          }}
          style={style.image}
        />

        <View style={style.container}>
          <View style={{ marginBottom: 33 }}>
            <Text style={style.h3}>{title}</Text>
            <Text style={style.p2}>{numQuestion} pertanyaan</Text>
          </View>
          <Text style={style.p1}>{description}</Text>
        </View>
      </ScrollView>
      <View style={style.container}>
        <TouchableOpacity
          style={style.button}
          onPress={() => navigation.navigate("SurveySummary")}
        >
          <Text style={style.buttonText}>Lihat ringkasan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  image: {
    width: "100%",
    height: 250,
  },
  container: {
    padding: 20,
  },
  h3: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_600SemiBold",
    color: "#475569",
    marginBottom: 8,
  },
  p2: {
    color: "#94A3B8",
    lineHeight: 14,
    fontFamily: "Urbanist_600SemiBold",
    fontSize: 12,
  },
  p1: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_500Medium",
    color: "#475569",
  },
  button: {
    width: "100%",
    backgroundColor: "#6E61E8",
    paddingVertical: 18,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Urbanist_600SemiBold",
    fontSize: 16,
    lineHeight: 20,
  },
});

export default MySurveyDetail;
