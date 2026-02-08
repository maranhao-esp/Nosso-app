// Service Worker para PWA
const CACHE_NAME = 'nosso-mundo-v1';
const urlsToCache = [
  '/',
  './index.html',
  './manifest.json'
];

// Instala o Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta requisições
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna do cache ou faz requisição
        return response || fetch(event.request);
      })
  );
});

// Firebase Messaging
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

// Mensagens em background
messaging.onBackgroundMessage((payload) => {
  console.log('[SW] Notificação recebida:', payload);
  
  const notificationTitle = payload.notification?.title || 'Nosso Mundo ❤️';
  const notificationOptions = {
    body: payload.notification?.body || 'Nova mensagem para você!',
    icon: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
    tag: 'chat-notification',
    data: payload.data || {},
    actions: [
      {
        action: 'open',
        title: 'Abrir App'
      }
    ]
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Clique na notificação
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ 
      type: 'window', 
      includeUncontrolled: true 
    })
    .then(clientList => {
      // Foca em janela existente ou abre nova
      for (const client of clientList) {
        if (client.url.includes('/') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
