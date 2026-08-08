const CACHE_NAME = 'admin-panel-cache-v1';
const urlsToCache = [
  './',
  './login.html',
  './index.html',
  './photos.html',
  './content.html',
  './overlay.html',
  './jersey_theme.html',
  './categories_sync.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
];

// 1. Install Service Worker & Cache Files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Fetch from Cache when Offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request).catch(() => {
            // ഇന്റർനെറ്റ് ഇല്ലെങ്കിൽ ലോഗിൻ പേജ് കാണിക്കുക
            return caches.match('./login.html');
        });
      }
    )
  );
});

// 3. Update Cache (Remove old caches)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
