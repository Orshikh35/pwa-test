importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAHosCLOepj-Zqnn8Efi1DJJyVf3Go65_A",
  authDomain: "pushnotification-47047.firebaseapp.com",
  projectId: "pushnotification-47047",
  storageBucket: "pushnotification-47047.firebasestorage.app",
  messagingSenderId: "525492025965",
  appId: "1:525492025965:web:22b8dd265e81cabe57dd64",
  measurementId: "G-24QLN2N2F9",
}
);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});