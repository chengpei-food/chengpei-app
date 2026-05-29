importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:            "AIzaSyC-GOgdphOqUm6uE3dBfRXe1iXRXqd-DBA",
  authDomain:        "cheng-pei.firebaseapp.com",
  projectId:         "cheng-pei",
  storageBucket:     "cheng-pei.firebasestorage.app",
  messagingSenderId: "656532319245",
  appId:             "1:656532319245:web:4ff72faa0017f28f307944"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  const { title, body } = payload.notification || {};
  if (!title) return;
  self.registration.showNotification(title, {
    body: body || '',
    icon: './icon-192.png',
    badge: './icon-192.png',
    vibrate: [200, 100, 200]
  });
});
