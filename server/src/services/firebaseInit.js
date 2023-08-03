import firebase from "firebase/app";
import "firebase/storage";
import firebaseConfig from "../config/firebase.config.js";

firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
