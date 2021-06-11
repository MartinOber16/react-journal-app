import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD9mBmJUj_aYGOcycQhNVL_Gwyih0vO1Rc",
    authDomain: "react-app-cursos-e4a50.firebaseapp.com",
    projectId: "react-app-cursos-e4a50",
    storageBucket: "react-app-cursos-e4a50.appspot.com",
    messagingSenderId: "986373251253",
    appId: "1:986373251253:web:cbfaa1c66ac281a94e9efc"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore(); // base de datos
const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); // Autenticación con Google

export {
    db,
    googleAuthProvider,
    firebase,
}