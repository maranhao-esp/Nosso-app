importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyAsK3kEuustv7KyoQXR0Ep-whTpDCDa03w",
  authDomain: "manuu-c23a7.firebaseapp.com",
  projectId: "manuu-c23a7",
  storageBucket: "manuu-c23a7.firebasestorage.app",
  messagingSenderId: "378235951611",
  appId: "1:378235951611:web:72c855fbb5ccdb1a84535e"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Notificação recebida:', payload);
  
  const notificationTitle = payload.notification?.title || 'Nosso Mundo ❤️';
  const notificationOptions = {
    body: payload.notification?.body || 'Nova mensagem!',
    icon: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png'
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
