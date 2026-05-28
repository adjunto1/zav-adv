const CACHE_NAME = 'zav-v3';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Sem cache - sempre busca da rede
  e.respondWith(fetch(e.request).catch(() => new Response('Offline')));
});
