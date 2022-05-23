import { db } from "@config/";
import {
  doc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  addDoc,
  getDoc,
} from "firebase/firestore";

export const getSurvey = async (user) => {
  const userRef = doc(db, "users", user);

  const q = query(collection(db, "surveys"), where("user_id", "!=", userRef));
  const querySnapshot = await getDocs(q);

  let arr = [];
  let date = new Date();
  date.setMonth(date.getMonth() + 1);

  querySnapshot.forEach((doc) => {
    let data = doc.data();
    if (new Date(data.timestamp.seconds * 1000) < date) {
      arr.push({
        ...data,
        id: doc.id,
        numQuestion: data.question_list.length,
      });
    }
  });

  return arr;
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

    arr.push({ ...data, id: item.id, numQuestion: data.question_list.length });
  }

  return arr;
};

export const saveAnswer = async (user, surveyId, answer) => {
  const docRef = await addDoc(collection(db, "answers"), {
    user_id: doc(db, "users", user),
    survey_id: doc(db, "surveys", surveyId),
    answer: answer,
  });

  return docRef.id;
};

export const getAnswer = async (surveyId) => {
  let surveyRef = doc(db, "surveys", surveyId);
  let q = query(collection(db, "answers"), where("survey_id", "==", surveyRef));
  let querySnapshot = await getDocs(q);

  let arr = [];
  querySnapshot.forEach((snapshot) => {
    let data = snapshot.data();
    arr.push(data.answer);
  });

  return arr;
};

export const getQuestion = async (surveyId) => {
  let surveyRef = doc(db, "surveys", surveyId);

  return await getDoc(surveyRef).then((doc) => {
    if (doc.exists) {
      let data = doc.data();
      return data.question_list;
    }
  });
};
