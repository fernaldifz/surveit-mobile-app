import { db } from "@config/";
import {
  doc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";

export const getSurvey = async (user) => {
  const userRef = doc(db, "users", user);

  const q = query(collection(db, "surveys"), where("user_id", "!=", userRef));
  const querySnapshot = await getDocs(q);

  let arr = [];
  querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), id: doc.id });
  });

  return arr;
};

export const getNumQuestion = async (surveyId) => {
  const surveyRef = doc(db, "surveys", surveyId);
  const q = query(
    collection(db, "questions"),
    where("survey_id", "==", surveyRef)
  );
  let querySnapshot = await getDocs(q);
  return querySnapshot.size;
};

export const getUserSurvey = async (user, type) => {
  const userRef = doc(db, "users", user);

  let date = new Date();
  date.setMonth(date.getMonth() - 1);

  const q = query(
    collection(db, "surveys"),
    where("user_id", "==", userRef),
    where("timestamp", type ? ">=" : "<", date),
    orderBy("timestamp", "desc") //change
  );

  let querySnapshot = await getDocs(q);

  let arr = [];

  for (let item of querySnapshot.docs) {
    let data = item.data();
    delete data["user_id"];

    let numQuestion = await getNumQuestion(item.id);

    arr.push({ ...data, id: item.id, numQuestion: numQuestion });
  }

  return arr;
};
