import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MySurvey from "../screens/Survey/MySurvey";

const Tab = createMaterialTopTabNavigator();
export const SurveyNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#6E61E8",
        tabBarInactiveTintColor: "#94A3B8",
        tabBarLabelStyle: {
          textTransform: "capitalize",
          fontSize: 16,
          lineHeight: 20,
          fontFamily: "Urbanist_600SemiBold",
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#6E61E8",
        },
      }}
    >
      <Tab.Screen
        name="Ongoing"
        component={MySurvey}
        initialParams={{ type: true }}
      />
      <Tab.Screen
        name="Past"
        component={MySurvey}
        initialParams={{ type: false }}
      />
    </Tab.Navigator>
  );
};
