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
import { MONTH, USER_TEMPLATE } from "@const/";
import { db } from "@config/";

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

export const getVoucherlist = async (user) => {
  const querySnapshot = await getDocs(collection(db, "vouchers"));
  const userVoucher = await getUserVoucher(user);

  let arr = [];
  querySnapshot.forEach((doc) => {
    if (!userVoucher.some((item) => item.id === doc.id)) {
      arr.push({ ...doc.data(), id: doc.id });
    }
  });

  return arr;
};

export const getUserVoucher = async (user) => {
  let userRef = doc(db, "users", user);
  let q = query(collection(db, "user_voucher"), where("user", "==", userRef));

  let querySnapshot = await getDocs(q);

  let arr = [];
  if (!querySnapshot.empty) {
    for (let item of querySnapshot.docs) {
      let { voucher } = item.data();

      await getDoc(voucher).then(async (snapshot) => {
        if (snapshot.exists) {
          let data = await snapshot.data();
          let date = new Date(data["due"].toDate());
          data["due"] = `${date.getDate()} ${
            MONTH[date.getMonth()]
          } ${date.getFullYear()}`;
          arr.push({ ...data, id: snapshot.id });
        }
      });
    }
  }

  return arr;
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

export const register = async (email, name, id) => {
  let userRef = doc(db, "users", id);

  let data = {
    email: email,
    name: name,
    point: 0,
    photo: USER_TEMPLATE,
  };

  return await setDoc(userRef, data, { merge: true })
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};
