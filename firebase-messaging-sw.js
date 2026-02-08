importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyAsK3kEuustv7KyoQXR0Ep-whTpDCDa03w",
  authDomain: "manuu-c23a7.firebaseapp.com",
  databaseURL: "https://manuu-c23a7-default-rtdb.firebaseio.com",
  projectId: "manuu-c23a7",
  storageBucket: "manuu-c23a7.firebasestorage.app",
  messagingSenderId: "378235951611",
  appId: "1:378235951611:web:72c855fbb5ccdb1a84535e"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  console.log('Notificação recebida:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg'
  };
  
  self.registration.showNotification(notificationTitle, notificationOptions);
});
