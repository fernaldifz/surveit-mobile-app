import SurveyCategory from "@screens/SurveyCategory";
import SurveyRecommendation from "@screens/SurveyRecommendation";
import MySurveyDetail from "@screens/Survey/MySurveyDetail";

import SignUp from "@screens/SignUp";
import LogIn from "@screens/LogIn";
import Guide from "@screens/Guide";

import EditProfile from "@screens/Profile/EditProfile";
import RedeemPoint from "@screens/Profile/RedeemPoint";
import Voucher from "@screens/Profile/Voucher";

import { NavigationBar } from "./TabNav";
import { SurveyNav } from "./MySurveyNav";

export const StackNav = [
  {
    name: "Main",
    component: NavigationBar,
    options: { headerShown: false },
  },
  {
    name: "MySurvey",
    component: SurveyNav,
    options: {
      title: "Surveimu",
    },
  },
  {
    name: "RedeemPoint",
    component: RedeemPoint,
    options: {
      title: "Tukar poinmu",
    },
  },
  {
    name: "EditProfile",
    component: EditProfile,
    options: { title: "Edit Profil" },
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
  {
    name: "Voucher",
    component: Voucher,
    options: {
      title: "Vouchermu",
    },
  },
  {
    name: "MySurveyDetail",
    component: MySurveyDetail,
    options: { headerTransparent: true, title: "" },
  },
];
