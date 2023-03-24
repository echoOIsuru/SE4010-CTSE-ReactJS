import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyACt0wc05oZIo7U9-L2QKYdtI3FICW3KO0",
    authDomain: "mealmagic-636d1.firebaseapp.com",
    projectId: "mealmagic-636d1",
    storageBucket: "mealmagic-636d1.appspot.com",
    messagingSenderId: "457066652150",
    appId: "1:457066652150:web:fc9c0edd32be4eb9ace7d7",
    measurementId: "G-M7PFYRP0HS"
};

if (!firebase.app.lenght) {
    firebase.initializeApp(firebaseConfig)
}

export { firebase };