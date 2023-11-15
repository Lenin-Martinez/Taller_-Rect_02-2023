import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./ServiceAccount";
import { initializeAuth } from "firebase/auth";

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app);

export { app,auth };