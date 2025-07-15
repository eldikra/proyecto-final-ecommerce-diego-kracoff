import {db} from '../models/firebase.js';
import {collection} from "firebase/firestore"
import {doc, setDoc, getDocs,query,where} from "firebase/firestore";

const usersCollection = collection(db, 'users');

async function createUser(userData) {
  const docRef = doc(usersCollection);
  await setDoc(docRef, userData);
  return { id: docRef.id, ...userData };
}

async function findUserByEmail(email) {
  const userQuery = query(usersCollection, where("email", "==", email));
  const querySnapshot = await getDocs(userQuery);
  if (querySnapshot.empty) return null;
  const userDoc = querySnapshot.docs[0];
  return { id: userDoc.id, ...userDoc.data() };
}

export { createUser, findUserByEmail };
