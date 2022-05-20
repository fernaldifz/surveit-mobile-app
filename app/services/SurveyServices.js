import { db } from "@config/";
import {
  doc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";


export const getSurvey = async (user, type) => {
  const userRef = doc(db, "users", user);
  const q = query(
    collection(db, "surveys"),
    where("user_id", "==", userRef),
    where("timestamp", type ? "<" : ">=", new Date())
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

export const getNumQuestion = async (surveyId) => {
  const surveyRef = doc(db, "surveys", surveyId);
  const q = query(
    collection(db, "questions"),
    where("survey_id", "==", surveyRef)
  );
  let querySnapshot = await getDocs(q);
  return querySnapshot.size;
};
