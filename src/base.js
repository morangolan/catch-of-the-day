import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCAORS0npnTMfyj0tF6R6SF_L8bfjj1MUc",
    authDomain: "catch-of-the-day-moran-golan.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-moran-golan.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

//Named export:
export { firebaseApp };

// default export:
export default base;
