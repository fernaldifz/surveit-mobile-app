import SurveyCategory from "@screens/SurveyCategory";
import SurveyRecommendation from "@screens/SurveyRecommendation";
import SignUp from "@screens/SignUp";
import LogIn from "@screens/LogIn";
import EditProfile from "@screens/Profile/EditProfile";
import Voucher from "@screens/Profile/Voucher";
import Guide from "@screens/Guide";

import { NavigationBar } from "./TabNav";

export const StackNav = [
  {
    name: "Main",
    component: NavigationBar,
    options: { headerShown: false },
  },
  {
    name: "Voucher",
    component: Voucher,
    options: { title: "Tukar poinmu" },
  },
  {
    name: "EditProfile",
    component: EditProfile,
    options: { headerShown: false },
  },
  {
    name: "Guide",
    component: Guide,
    options: { headerShown: false },
  },
  {
    name: "SurveyCategory",
    component: SurveyCategory,
    options: { headerShown: false },
  },
  {
    name: "SurveyRecommendation",
    component: SurveyRecommendation,
    options: { headerShown: false },
  },
  {
    name: "SignUp",
    component: SignUp,
    options: { headerShown: false },
  },
  {
    name: "LogIn",
    component: LogIn,
    options: { headerShown: false },
  },
];
