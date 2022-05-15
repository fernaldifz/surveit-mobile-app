import { db } from "@config/";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  addDoc,
  setDoc,
} from "firebase/firestore";

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

export const getVoucherlist = async () => {
  const querySnapshot = await getDocs(collection(db, "vouchers"));

  let arr = [];
  querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), id: doc.id });
  });

  return arr;
};

export const getUserVoucher = async (user) => {
  const userRef = doc(db, "users", user);
  const q = query(collection(db, "user_voucher"), where("user", "==", userRef));

  const querySnapshot = await getDocs(q);

  let arr = [];
  querySnapshot.forEach(async (doc) => {
    let temp = { id: doc.id, ...doc.data() };

    if (temp.voucher) {
      let voucherData = await getDoc(temp.voucher);

      if (voucherData.exists) {
        delete temp.voucher;
        temp = { ...voucherData.data(), ...temp };
        arr.push(temp);
      }
    }
  });
};

export const getVoucher = async (id) => {
  const myDoc = doc(db, "vouchers", id);

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

export const addUserVoucher = async (user, voucher) => {
  const userRef = doc(db, "users", user);
  const voucherRef = doc(db, "vouchers", voucher);

  const params = {
    user: userRef,
    voucher: voucherRef,
  };

  return await addDoc(collection(db, "user_voucher"), params, { merge: true })
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};

export const reducePoint = async (user, point) => {
  const userRef = doc(db, "users", user);
  const userInfo = await getUser(user);

  let res = userInfo.point - point;
  if (res < 0) {
    return false;
  }

  return await setDoc(userRef, { point: res }, { merge: true })
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};

export const redeemVoucher = async (user, id, point) => {
  let reduceRes = await reducePoint(user, point);
  let addRes = null;

  if (reduceRes) {
    addRes = await addUserVoucher(user, id);
  } else {
    return false;
  }

  return addRes && reduceRes;
};
