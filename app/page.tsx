"use client";

import React, { useEffect } from "react";
import Login from "@/components/Login";
import { generateToken, messaging } from "@/firebase";
import { onMessage } from "firebase/messaging";
import toast, { Toaster } from "react-hot-toast";

function Page() {
  useEffect(() => {
    const setupNotifications = async () => {
      try {
        const token = await generateToken();
        console.log("FCM Token:", token);

        if (messaging) {
          onMessage(messaging, (payload) => {
            console.log("Push message received:", payload);
            toast(payload.notification?.body ?? "No message body available");
          });
        } else {
          console.error("Messaging is not available");
        }
      } catch (error) {
        console.error("Notification setup error:", error);
      }
    };

    setupNotifications();
  }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker registered with scope:", registration.scope);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  return (
    <div>
      <Toaster />
      <Login />
    </div>
  );
}

export default Page;
