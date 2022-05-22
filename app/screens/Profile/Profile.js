import { useEffect, useState } from "react";
import pointPic from "@assets/point.png";
import editPic from "@assets/pencil.png";
import cheveronRight from "@assets/cheveron-right.png";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { getUser } from "@services/ProfileServices";
import { dummyAcc } from "@const";

const Profile = ({ navigation }) => {
  const [userDoc, setUserDoc] = useState(null);

  const fetchUser = async () => {
    const data = await getUser(dummyAcc);
    setUserDoc(data);
  };

  useEffect(() => {
    fetchUser();
    const willFocusSubscription = navigation.addListener("focus", () => {
      fetchUser();
    });

    return willFocusSubscription;
  }, []);

  return (
    userDoc && (
      <View style={{ alignItems: "center" }}>
        <View style={{ width: 320, marginTop: 44 }}>
          <Text style={styles.h1}>Profil</Text>
          <View style={{ alignItems: "center" }}>
            <Image style={styles.profpic} source={{ uri: userDoc.photo }} />
            <View style={{ marginTop: 20 }}>
              <Text style={styles.h2}>{userDoc.name}</Text>
            </View>
            <View
              style={{
                marginTop: 12,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image style={styles.point} source={pointPic} />
              <View style={{ marginLeft: 8 }}>
                <Text style={[styles.h3, { color: "#F9AD5D" }]}>
                  {userDoc.point} Poin
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.editProfileButton}
              onPress={() => navigation.navigate("EditProfile")}
            >
              <Image
                style={{ width: 16, height: 16, marginRight: 12 }}
                source={editPic}
              />
              <Text style={[styles.button1, { color: "#FFFFFF" }]}>
                Edit profil
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: 320, marginTop: 32 }}>
          <TouchableOpacity
            style={styles.whiteBoxButton}
            onPress={() => navigation.navigate("RedeemPoint")}
          >
            <View style={{ width: 262, marginLeft: 16, marginRight: 10 }}>
              <Text style={[styles.button1, { color: "#475569" }]}>
                Tukar poinmu
              </Text>
            </View>
            <Image
              style={{ width: 16, height: 16, marginRight: 16 }}
              source={cheveronRight}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.whiteBoxButton, { marginTop: 8 }]}
            onPress={() => navigation.navigate("MySurvey")}
          >
            <View style={{ width: 262, marginLeft: 16, marginRight: 10 }}>
              <Text style={[styles.button1, { color: "#475569" }]}>
                Surveimu
              </Text>
            </View>
            <Image
              style={{ width: 16, height: 16, marginRight: 16 }}
              source={cheveronRight}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.logOutButton, { marginTop: 64 }]}>
          <Text style={[styles.button1, { color: "#E86181" }]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
    lineHeight: 28,
    fontFamily: "Urbanist_600SemiBold",
    color: "#475569",
  },
  h2: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: "Urbanist_600SemiBold",
    color: "#475569",
  },
  h3: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_600SemiBold",
    color: "#475569",
  },
  p1: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_500Medium",
    color: "#ffffff",
    textAlign: "center",
    width: 320,
  },
  button1: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_600SemiBold",
    color: "#6E61E8",
  },
  profpic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    alignItems: "center",
  },
  point: {
    width: 24,
    height: 24,
  },
  editProfileButton: {
    width: 138,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#6E61E8",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 32,
  },
  whiteBoxButton: {
    width: 320,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  logOutButton: {
    width: 138,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(232, 97, 129, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Profile;
