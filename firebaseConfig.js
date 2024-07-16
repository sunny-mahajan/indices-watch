// firebaseConfig.js
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyC5H1_Oprbve7CAtsfQSf7Kmf9MtYuvMaw",
  authDomain: "uw-stockapi-test.firebaseapp.com",
  projectId: "uw-stockapi-test",
  storageBucket: "uw-stockapi-test.appspot.com",
  messagingSenderId: "808637145707",
  appId: "1:808637145707:web:3ce05afd9515882dd9472e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

module.exports = { auth };
