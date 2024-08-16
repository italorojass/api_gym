// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHOu8iZM68FxZ4i2XWDYx8PcSpVxlYris",
  authDomain: "gymmove-49125.firebaseapp.com",
  projectId: "gymmove-49125",
  storageBucket: "gymmove-49125.appspot.com",
  messagingSenderId: "766372287694",
  appId: "1:766372287694:web:ef88ce59ed560732a2ec9f",
  measurementId: "G-39HQ0LK95R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
module.exports = app;