import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyD9mBmJUj_aYGOcycQhNVL_Gwyih0vO1Rc",
//   authDomain: "react-app-cursos-e4a50.firebaseapp.com",
//   projectId: "react-app-cursos-e4a50",
//   storageBucket: "react-app-cursos-e4a50.appspot.com",
//   messagingSenderId: "986373251253",
//   appId: "1:986373251253:web:cbfaa1c66ac281a94e9efc"
// };

// const firebaseConfigTesting = {
//   apiKey: "AIzaSyAUNnR1FPCYabtz0W_9jOihh2rkiHFhdOY",
//   authDomain: "testdb-5d356.firebaseapp.com",
//   projectId: "testdb-5d356",
//   storageBucket: "testdb-5d356.appspot.com",
//   messagingSenderId: "832022957767",
//   appId: "1:832022957767:web:d4389495cc27dd26baf8e2"
// };

// if( process.env.NODE_ENV === 'test') {
//   // testing
//   firebase.initializeApp(firebaseConfigTesting);
// } else {
//   // dev/prod
//   firebase.initializeApp(firebaseConfig);
// }

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore(); // base de datos
const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); // Autenticación con Google

export {
    db,
    googleAuthProvider,
    firebase,
}