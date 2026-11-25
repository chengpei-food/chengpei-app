const CACHE_NAME = 'chengpei-v142';
const ASSETS = [
  './index.html',
  './customer.html',
  './admin.html',
  './stocktake.html',
  './firebase-config.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Firebase 程式庫：第一次有網路時存起來，之後沒訊號也能開（盤點頁在冷凍庫用）
  if (e.request.method === 'GET' && e.request.url.includes('gstatic.com/firebasejs/')) {
    e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request).then(r => {
      const cp = r.clone(); caches.open(CACHE_NAME).then(c => c.put(e.request, cp)); return r;
    })));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('./index.html')))
  );
});
