"use client";

import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// Firebase тохиргоо
const firebaseConfig = {
  apiKey: "AIzaSyAHosCLOepj-Zqnn8Efi1DJJyVf3Go65_A",
  authDomain: "pushnotification-47047.firebaseapp.com",
  projectId: "pushnotification-47047",
  storageBucket: "pushnotification-47047.firebasestorage.app",
  messagingSenderId: "525492025965",
  appId: "1:525492025965:web:22b8dd265e81cabe57dd64",
  measurementId: "G-24QLN2N2F9",
};

// Firebase эхлүүлэх (typeof window шалгалтыг зөв ашиглах)
const app = (() => {
  if (typeof window !== "undefined") {
    return initializeApp(firebaseConfig);
  }
  return null;
})();

export const messaging = app ? getMessaging(app) : null;

export const generateToken = async () => {
  try {
    if (!messaging) {
      console.error("Messaging is not initialized.");
      return;
    }
    
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BCKSzzi2ETIxusz-ChVtx1I1YwltYNun4nucAF2SuhkCVIdn9npH6A9-B7vvFK-s77GcBF217Dwqp0yYvOC8FDI",
      });
      console.log("Generated Token:", token);
      return token;
    } else {
      console.warn("Notification permission denied");
    }
  } catch (error) {
    console.error("Error generating token:", error);
  }
};
