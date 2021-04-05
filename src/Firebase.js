import firebase from "firebase";
import KEYS from "./hidden";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: KEYS.apiKey,
  authDomain: KEYS.authDomain,
  projectId: KEYS.projectId,
  storageBucket: KEYS.projectId,
  messagingSenderId: KEYS.storageBucket,
  appId: KEYS.appId,
  measurementId: KEYS.measurementId,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.database();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
