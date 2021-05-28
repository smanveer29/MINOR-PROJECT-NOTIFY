import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBr2o-mUjdmrOwoJM9vKOAluLsD2VwNBqk",
    authDomain: "notify-3734c.firebaseapp.com",
    projectId: "notify-3734c",
    storageBucket: "notify-3734c.appspot.com",
    messagingSenderId: "505752014978",
    appId: "1:505752014978:web:74e9ad290cdf354671a49b",
    measurementId: "G-91LXYVX51L"
};

let firebaseApp;
if (firebase.apps.length === 0) {
    firebaseApp = firebase.initializeApp(firebaseConfig);
} else {
    firebaseApp = firebase.app();
}

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const rdb = firebase.database();


export { db, auth, provider, rdb }