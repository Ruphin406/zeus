const CACHE_NAME = 'zeus-study';

// Liste des ressources essentielles à mettre en cache
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/zeus-icon.png',
  // Fichiers principaux
  '/src/main.js',
  // Dossier core
  '/src/core/auth-service.js',
  '/src/core/firebase-config.js',
  // Dossier UI
  '/src/ui/auth-ui.js',
  '/src/ui/chat-view.js',
  '/src/ui/exercise-view.js',
  // Dossier Chat
  '/src/ui/chat-service.js',
  // Dossier Exercices
  '/src/exercises/exercise-service.js',
  '/styles/components.css',
  '/styles/theme.css'
];

// Installation du Service Worker : mise en cache initiale
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Mise en cache des ressources terminée.');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activation : Suppression des anciens caches obsolètes
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Stratégie de récupération : "Cache First"
// Sert les fichiers depuis le cache, sinon tente de les récupérer sur le réseau
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});