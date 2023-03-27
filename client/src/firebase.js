// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAKpBwV9nKBkjk88FCKwk41LFp1vvSzgA",
  authDomain: "weshare-dc33f.firebaseapp.com",
  projectId: "weshare-dc33f",
  storageBucket: "weshare-dc33f.appspot.com",
  messagingSenderId: "866453773175",
  appId: "1:866453773175:web:052d640fe9cb85b5a49f72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;