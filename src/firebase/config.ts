import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyARMzC10oACRk-gQtBkwHXk0qW_al-BqTw",
  authDomain: "gl-hub-labs.firebaseapp.com",
  databaseURL: "https://gl-hub-labs-default-rtdb.firebaseio.com",
  projectId: "gl-hub-labs",
  storageBucket: "gl-hub-labs.firebasestorage.app",
  messagingSenderId: "478131918341",
  appId: "1:478131918341:web:c250edb5a535735d24ee6c",
  measurementId: "G-R69YPH1DSQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
