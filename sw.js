/**
 * MathPortal • Service Worker (PWA Offline Support)
 * Cache-First for static assets and KaTeX fonts.
 * Stale-While-Revalidate for app scripts and stylesheets.
 * Network-only for /api/ sync calls.
 */

const CACHE_NAME = 'mathportal-v14';

const PRECACHE_ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './icon.svg',
    './css/style.css',
    './js/icons.js',
    './js/app.js',
    './data/courses_manifest.js',
    './data/concepts.js',
    './data/flashcards.js',
    './data/courses/mat204_grup.js',
    './data/courses/mat204_grup.json',
    'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css',
    'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js',
    'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(PRECACHE_ASSETS.map(url => new Request(url, { cache: 'reload' })));
        }).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(name => {
                    if (name !== CACHE_NAME) {
                        return caches.delete(name);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // Bypass API routes completely
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(fetch(event.request));
        return;
    }

    // KaTeX CDN fonts & styles: Cache First with network fallback
    if (url.origin.includes('cdn.jsdelivr.net')) {
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) return cachedResponse;
                return fetch(event.request).then(networkResponse => {
                    if (networkResponse && networkResponse.status === 200) {
                        const responseClone = networkResponse.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
                    }
                    return networkResponse;
                });
            })
        );
        return;
    }

    // Same-origin assets: Stale-While-Revalidate
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            const fetchPromise = fetch(event.request).then(networkResponse => {
                if (networkResponse && networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
                }
                return networkResponse;
            }).catch(() => {
                // Return cached version or offline page if network fails
                return cachedResponse;
            });

            return cachedResponse || fetchPromise;
        })
    );
});
