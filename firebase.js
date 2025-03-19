// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHosCLOepj-Zqnn8Efi1DJJyVf3Go65_A",
  authDomain: "pushnotification-47047.firebaseapp.com",
  projectId: "pushnotification-47047",
  storageBucket: "pushnotification-47047.firebasestorage.app",
  messagingSenderId: "525492025965",
  appId: "1:525492025965:web:22b8dd265e81cabe57dd64",
  measurementId: "G-24QLN2N2F9",
};

// Initialize Firebase
const app = typeof window !== "undefined" ? initializeApp(firebaseConfig) : null;

export const generateToken = async () => {
    if (typeof window === "undefined") return null;

  const permission = await Notification.requestPermission();
  console.log(permission);
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BCKSzzi2ETIxusz-ChVtx1I1YwltYNun4nucAF2SuhkCVIdn9npH6A9-B7vvFK-s77GcBF217Dwqp0yYvOC8FDI",
    });
    console.log(token);
  }
};
export const messaging = typeof window !== "undefined" ? getMessaging(app) : null;