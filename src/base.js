import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyB46HrQlCN_fuAgxeizrSEyVz8FIa111U0",
    authDomain: "catch-of-the-day-aswanepoel.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-aswanepoel-default-rtdb.firebaseio.com"
})

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp }

// This is a default export
export default base;