import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfJfJfJfJfJfJfJfJfJfJfJfJfJfJfJfJf",
  authDomain: "my-app-123456.firebaseapp.com",
  projectId: "my-app-123456",
  appId: "1:my-app-123456:web:123456",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();