// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmZLGrE-l3MjikS9hz8uaTkgr7VIn5UPU",
  authDomain: "work-log-db.firebaseapp.com",
  databaseURL: "https://work-log-db-default-rtdb.firebaseio.com",
  projectId: "work-log-db",
  storageBucket: "work-log-db.firebasestorage.app",
  messagingSenderId: "748416973370",
  appId: "1:748416973370:web:057ab698dff176e26ad303",
  measurementId: "G-KTNRV8QPLL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
