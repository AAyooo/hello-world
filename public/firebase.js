// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAR_otITJIr9cQMNLhqOQu09TAsIcejFEY",
    authDomain: "cutsies-937c3.firebaseapp.com",
    projectId: "cutsies-937c3",
    storageBucket: "cutsies-937c3.appspot.com",
    messagingSenderId: "540203592295",
    appId: "1:540203592295:web:69c359af678ea7e3ae82c2",
    measurementId: "G-F3YH1GG86M"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/**Global Variables */
const firebaseDB = firebase.firestore();
const authProvider = new firebase.auth.GoogleAuthProvider();

const restaurantCollection = firebaseDB.collection('restaurants');
const waitlistCollection = firebaseDB.collection('waitlist');

/**authentication */
const firebaseAuth = firebase.auth();

