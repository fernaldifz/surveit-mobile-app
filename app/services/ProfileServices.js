import { db } from "@config/";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const getUser = async (user) => {
  const myDoc = doc(db, "users", user);

  return await getDoc(myDoc)
    .then((snapshot) => {
      if (snapshot.exists) {
        const data = snapshot.data();
        return data;
      }
    })
    .catch((error) => {
      console.error(error.message);
    });
};