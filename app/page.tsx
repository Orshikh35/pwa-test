"use client";
import React, { useEffect } from "react";
import Login from "@/components/Login";
import { generateToken, messaging } from "../firebase";
import { onMessage } from "firebase/messaging";
import toast, { Toaster } from "react-hot-toast";

function Page() {
  useEffect(() => {
    generateToken();

    if (messaging) {
      onMessage(messaging, (payload) => {
        console.log("Message received.", payload);
        toast(payload.notification?.body ?? "No message body available");
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
