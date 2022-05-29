import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAjmIKKz8t-WwewFSPbOH7_GLejyn8Tt3s",
  authDomain: "dr-botany3.firebaseapp.com",
  projectId: "dr-botany3",
  storageBucket: "dr-botany3.appspot.com",
  messagingSenderId: "461612787619",
  appId: "1:461612787619:web:4b5870bcc968695a42dc16",
  measurementId: "G-YYLM3KL0VY",
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const auth = getAuth(app);
