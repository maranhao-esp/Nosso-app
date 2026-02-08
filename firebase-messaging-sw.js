importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyAsK3kEuustv7KyoQXR0Ep-whTpDCDa03w",
    projectId: "manuu-c23a7",
    messagingSenderId: "378235951611",
    appId: "1:378235951611:web:72c855fbb5ccdb1a84535e"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'https://cdn-icons-png.flaticon.com/512/2589/2589175.png'
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});
